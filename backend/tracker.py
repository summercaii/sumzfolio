from flask import Flask, request, jsonify, make_response
from bs4 import BeautifulSoup
import smtplib
import requests
import os
import psycopg2
from urllib.parse import urlparse
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask_cors import CORS
from apscheduler.schedulers.background import BackgroundScheduler
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "https://summer-cai.com"]}}, supports_credentials=True, always_send=True)
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["5 per minute"]
)

db_url = os.getenv("DATABASE_URL")

def get_db_connection():
    return psycopg2.connect(db_url)

def create_table():
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute('''
                CREATE TABLE IF NOT EXISTS tracked_products (
                    id SERIAL PRIMARY KEY,
                    url TEXT NOT NULL,
                    price_threshold FLOAT,
                    email TEXT NOT NULL,
                    notification_sent BOOLEAN DEFAULT FALSE
                )
            ''')
            conn.commit()
create_table()

# function to check Amazon product prices
def check_amazon_price(url):
    headers = {
        'User-Agent': os.getenv('USER_AGENT'),
        'Accept-Language': os.getenv('ACCEPT_LANGUAGE')
    }

    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, 'html.parser')

    # find all possible prices
    price_span = soup.find('span', {'id': 'priceblock_dealprice'})
    if not price_span:
        price_span = soup.find('span', {'id': 'priceblock_ourprice'})
    if not price_span:
        whole_price = soup.find('span', {'class': 'a-price-whole'})
        fraction_price = soup.find('span', {'class': 'a-price-fraction'})
        if whole_price and fraction_price:
            price_span = whole_price.text + fraction_price.text

    if price_span:
        return float(price_span.replace(',', ''))
    else:
        return None

# send an email notification
def send_email_notification(recipient_email, product_url, current_price, threshold=None, discount=None):
    sender_email = os.getenv("EMAIL_USER")
    password = os.getenv("EMAIL_PASSWORD")
    
    # subject
    message = MIMEMultipart()
    message['From'] = sender_email
    message['To'] = recipient_email
    message['Subject'] = "AMAZON PRICE DROP!!!"

    # email
    # @todo: parse product name later
    body = f"The price for {product_url} has dropped to {current_price}!"
    message.attach(MIMEText(body, 'plain'))

    # send
    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender_email, password)  # Use the app-specific password here
        text = message.as_string()
        server.sendmail(sender_email, recipient_email, text)
        server.quit()
        print("Email sent successfully!")
    except Exception as e:
        print(f"Failed to send email: {e}")

# periodically check prices for tracked products
def check_prices_periodically():
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            # fetch products that need to be checked
            cur.execute("SELECT id, url, price_threshold, email, notification_sent FROM tracked_products FOR UPDATE")
            tracked_products = cur.fetchall()

            if not tracked_products:
                print("No tracked products to check.")
                return

            # check each tracked product
            for product in tracked_products:
                product_id, product_url, price_threshold, email, notification_sent = product
                current_price = check_amazon_price(product_url)
                
                if current_price is not None:
                    # if price below threshold and email not sent yet
                    if current_price <= price_threshold and not notification_sent:
                        send_email_notification(email, product_url, current_price, threshold=price_threshold)

                        # mark as send to avoid spam emails
                        cur.execute("UPDATE tracked_products SET notification_sent = TRUE WHERE id = %s", (product_id,))
                        conn.commit()

                    # if the price goes back up, reset the notification flag
                    elif current_price > price_threshold and notification_sent:
                        cur.execute("UPDATE tracked_products SET notification_sent = FALSE WHERE id = %s", (product_id,))
                        conn.commit()
                else:
                    print(f"No price found for {product_url}")


@app.route('/track_price', methods=['POST', 'OPTIONS'])
def track_price():
    if request.method == 'OPTIONS':
        response = make_response('', 204)
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization, Origin"
        return response

    data = request.json
    product_url = data.get('amazon_url')
    price_threshold = float(data.get('price_threshold', 0))
    email = data.get('email')

    # add to db
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            # clear table
            cur.execute("DELETE FROM tracked_products WHERE email = %s", (email,))
            # insert
            cur.execute(
                "INSERT INTO tracked_products (url, price_threshold, email) VALUES (%s, %s, %s)",
                (product_url, price_threshold, email)
            )
            conn.commit()
    # just to make sure
    response = jsonify({'message': 'Price tracking initiated successfully!'})
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
    response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
    return response

if __name__ == '__main__':
    scheduler = BackgroundScheduler()
    if not scheduler.get_jobs():
        job = scheduler.add_job(func=check_prices_periodically, trigger="interval", minutes=1440)
    scheduler.start()
    try:
        app.run(debug=True)
    except (KeyboardInterrupt, SystemExit):
        scheduler.shutdown()