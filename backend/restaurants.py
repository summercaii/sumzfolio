from flask import Flask, request, jsonify
from flask_cors import CORS  
from tracker import track_price
import os
import requests
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "https://summer-cai.com"]}})
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["30 per minute"]
)

# preflight requests
@app.route('/api/recommendations', methods=['OPTIONS'])
def handle_preflight():
    response = jsonify({'status': 'preflight'})
    response.headers.add('Access-Control-Allow-Origin', 'https://summer-cai.com')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    return response

@app.route('/')
def index():
    return ""

def get_price_range(price):
    if price == '$':
        return [1]
    elif price == '$$':
        return [1, 2]
    elif price == '$$$':
        return [2, 3]
    elif price == '$$$$':
        return [3, 4]
    return []

API_KEY = os.getenv('YELP_API_KEY')

# get restaurant data from yelp, returns list of restaurants or empty list18032
def get_restaurant_data(location, radius, cuisine=None, price_range=None):
    url = 'https://api.yelp.com/v3/businesses/search'
    headers = {'Authorization': f'Bearer {API_KEY}'}
    params = {
        'term': cuisine if cuisine else 'restaurant',
        'location': location,
        'radius': int(radius * 1609.34),
        'price': get_price_range(price_range),
        'limit': 10
    }

    response = requests.get(url, headers=headers, params=params)
    if response.status_code == 200:
        data = response.json()
        restaurants = []
        for business in data['businesses']:
            business_details = requests.get(f'https://api.yelp.com/v3/businesses/{business["id"]}', headers=headers)
            business_details_data = business_details.json()

            restaurant = {
                'name': business['name'],
                'rating': business['rating'],
                'cuisine': business['categories'][0]['title'] if business['categories'] else 'N/A',
                'review_count': business['review_count'], 
                'phone': business.get('display_phone', 'Not available'),
                'images': business_details_data.get('photos', []),
                'price_range': business.get('price', 'N/A'),
                'distance': round(business['distance'] / 1609.34, 2),
                'location': business['location']['address1'],
                'url': business['url']
            }
            restaurants.append(restaurant)
            
        return restaurants
    else:
        return []

# get user input restaurant info from yelp
# cuisine, price range
def get_restaurant_info(restaurant, location):
    headers = {'Authorization': f'Bearer {API_KEY}'}
    url = 'https://api.yelp.com/v3/businesses/search'

    params = {
        'term': restaurant,
        'location': location,
        'limit': 1
    }

    response = requests.get(url, headers=headers, params=params)
    if response.status_code == 200:
        data = response.json()
        if data['businesses']:
            business = data['businesses'][0]
            return {
                'name': business['name'],
                'cuisine': business['categories'][0]['title'] if business['categories'] else 'N/A',
                'price_range': business.get('price', 'N/A'),
                'rating': business['rating']
            }
    return None

# filter restaurant list by radius, price range, cuisine
def filter_restaurants(restaurants, favorite_info, radius, price_range):
    recommended = []
    cuisine = favorite_info['cuisine']
    price_level = get_price_range(price_range)
    favorite_name = favorite_info['name'].lower()
    for restaurant in restaurants:
        if restaurant['name'].lower() == favorite_name:
            continue
        if restaurant['distance'] <= radius and restaurant['cuisine'] == cuisine:
            if price_level and len(restaurant['price_range']) not in price_level:
                continue
            recommended.append(restaurant)
    return recommended


# API endpoint to get restaurant recommendations
@app.route('/api/recommendations', methods=['GET'])
def get_recommendations():
    restaurant_name = request.args.get('restaurant')
    location = request.args.get('location')
    radius = float(request.args.get('radius', 5))
    # get user restaurant
    favorite_info = get_restaurant_info(restaurant_name, location)
    if favorite_info:
        # get similar restaurant data based on user info
        restaurants = get_restaurant_data(location, radius, favorite_info['cuisine'], favorite_info['price_range'])
        # filter restaurants similar
        recommendations = filter_restaurants(restaurants, favorite_info, radius, favorite_info['price_range'])
        return jsonify(recommendations)
    return jsonify([]), 404

@app.route('/track_price', methods=['POST', 'OPTIONS'])
def track_price_route():
    return track_price()

if __name__ == '__main__':
    app.run(debug=True)