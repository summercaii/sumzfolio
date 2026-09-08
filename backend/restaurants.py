
import os, requests
from flask import Blueprint, request, jsonify

API_KEY = os.getenv('YELP_API_KEY')

restaurants_bp = Blueprint("restaurants", __name__, url_prefix="/api")

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

def get_restaurant_data(location, radius, cuisine=None, price_range=None):
    url = 'https://api.yelp.com/v3/businesses/search'
    headers = {'Authorization': f'Bearer {API_KEY}'}
    params = {
        'term': cuisine if cuisine else 'restaurant',
        'location': location,
        'radius': int(float(radius) * 1609.34),
        'limit': 10
    }
    
    pr = get_price_range(price_range)
    if pr:
        params['price'] = ",".join(map(str, pr))

    response = requests.get(url, headers=headers, params=params)
    if response.status_code != 200:
        return []

    data = response.json()
    restaurants = []
    for bus in data.get('businesses', []):
        bus_info = requests.get(f'https://api.yelp.com/v3/businesses/{bus["id"]}', headers=headers).json()
        restaurants.append({
            'name': bus.get('name'),
            'rating': bus.get('rating'),
            'cuisine': (bus.get('categories') or [{}])[0].get('title', 'N/A'),
            'review_count': bus.get('review_count'),
            'phone': bus.get('display_phone', 'Not available'),
            'images': bus_info.get('photos', []),
            'price_range': bus.get('price', 'N/A'),
            'distance': round(bus.get('distance', 0) / 1609.34, 2),
            'location': (bus.get('location') or {}).get('address1', ''),
            'url': bus.get('url')
        })
    return restaurants

def get_restaurant_info(restaurant, location):
    headers = {'Authorization': f'Bearer {API_KEY}'}
    url = 'https://api.yelp.com/v3/businesses/search'
    params = {'term': restaurant, 'location': location, 'limit': 1}
    response = requests.get(url, headers=headers, params=params)
    if response.status_code == 200:
        data = response.json()
        if data.get('businesses'):
            bus = data['businesses'][0]
            return {
                'name': bus['name'],
                'cuisine': (bus.get('categories') or [{}])[0].get('title', 'N/A'),
                'price_range': bus.get('price', 'N/A'),
                'rating': bus.get('rating')
            }
    return None

def filter_restaurants(restaurants, favorite_info, radius, price_range):
    recommended = []
    cuisine = favorite_info['cuisine']
    price_level = get_price_range(price_range)
    favorite_name = favorite_info['name'].lower()
    for r in restaurants:
        if r['name'].lower() == favorite_name:
            continue
        if r['distance'] <= float(radius) and r['cuisine'] == cuisine:
            if price_level and len(r['price_range']) not in price_level:
                continue
            recommended.append(r)
    return recommended

@restaurants_bp.route('/recommendations', methods=['GET'])
def get_recommendations():
    rest_name = request.args.get('restaurant', '')
    location = request.args.get('location', '')
    radius = float(request.args.get('radius', 5))
    fav_info = get_restaurant_info(rest_name, location)
    if not fav_info:
        return jsonify([]), 404
    rests = get_restaurant_data(location, radius, fav_info['cuisine'], fav_info['price_range'])
    recs = filter_restaurants(rests, fav_info, radius, fav_info['price_range'])
    return jsonify(recs)
