// src/components/CoffeeShops.js
import React from 'react';
import './styles/coffee.css';

function CoffeeShops() {
  return (
    <div>
      <header>
        <h1>Summer Cai</h1>
        <nav>
          <ul>
            <li><a href="/">Back to Portfolio</a></li>
          </ul>
        </nav>
      </header>

      <section id="coffee-shops">
        <h2>My Favorite Coffee Spots Ranked!!!</h2>
        <div className="drink-preference"> <p>Will always order a latte with oat milk</p></div>
        <div className="content-wrapper">
          {/* Coffee Shop List */}
          <div className="coffee-shop-list">
            <ol>
              <li><strong><a href="https://coffeehere.world/">Here Kyoto</a></strong> (Kyoto, Japan)</li>
              <li><strong><a href="https://jp.kurasu.kyoto/">Kurasu Kyoto Stand</a></strong> (Kyoto, Japan)</li>
              <li><strong><a href="http://www.weekenderscoffee.com/">WEEKENDERS COFFEE TOMINOKOJI</a></strong> (Kyoto, Japan)</li>
              <li><strong><a href="https://www.thecoffeemovement.com/">The Coffee Movement</a></strong> (San Francisco, CA)</li>
              <li><strong><a href="https://bluebottlecoffee.com/">Blue Bottle Coffee</a></strong> (Kyoto, Japan)</li>
              <li><strong><a href="https://www.yelp.com/biz/cassel-earth-coffee-irvine-2">Cassel Earth Coffee</a></strong> (Irvine, CA)</li>
              <li><strong><a href="http://www.loquatcoffee.com/">Loquat Coffee</a></strong> (Los Angeles, CA)</li>
              <li><strong><a href="http://homecoffeesf.com/">Home Coffee Roasters</a></strong> (San Francisco, CA)</li>
              <li><strong><a href="https://www.riseandgrind-sf.com/">Rise & Grind Coffeehouse</a></strong> (San Francisco, CA)</li>
              <li><strong><a href="http://www.yeemscoffee.com/">Yeems Coffee</a></strong> (Los Angeles, CA)</li>
              <li><strong><a href="http://scoutcoffeeco.com/">Scout Coffee</a></strong> (San Luis Obispo, CA)</li>
              <li><strong><a href="http://marucoffee.com/">Maru Coffee</a></strong> (Los Angeles, CA)</li>
              <li><strong><a href="https://www.vervecoffee.com/pages/locations-san-francisco">Verve Coffee Roasters</a></strong> (Tokyo, Japan)</li>
              <li><strong><a href="http://www.medleno.com/">Medleno Coffee Shop & Roastery</a></strong> (Danville, CA)</li>
              <li><strong><a href="http://www.keancoffee.com/">Kéan Coffee Artisan Roasters</a></strong> (Tustin, CA)</li>
              <li><strong><a href="https://www.yelp.com/biz/re-ca-phe-fountain-valley-2">Re Ca Phe</a></strong> (Fountain Valley, CA)</li>
              <li><strong><a href="https://www.voyagercraftcoffeeorders.com/">Voyager Craft Coffee</a></strong> (San Jose, CA)</li>
              <li><strong><a href="http://www.ralphs-coffee.com/">Ralph's Coffee</a></strong> (Tokyo, Japan)</li>
              <li><strong><a href="https://3thyme.com/index.html/">3THYME COFFEE</a></strong> (Los Angeles, California)</li>
              <li><strong><a href="https://www.pulleycollective.com/">Pulley Coffee Bar</a></strong> (Manhattan, NY)</li>
              <li><strong><a href="https://www.stereoscopecoffee.com/">Stereoscope Coffee</a></strong> (Los Angeles, CA)</li>
            </ol>
          </div>

          {/* Photo Gallery */}
          <div className="photo-gallery2">
            <div className="gallery-item">
              <img src={require('../photos/here.jpg')} alt="Here Kyoto Coffee" />
              <div className="caption">Here Kyoto</div>
            </div>
            <div className="gallery-item">
              <img src={require('../photos/week.jpg')} alt="Weekenders Coffee" />
              <div className="caption">Weekenders Coffee</div>
            </div>
            <div className="gallery-item">
              <img src={require('../photos/ralphs.jpg')} alt="Ralph's Coffee" />
              <div className="caption">Ralph's Coffee</div>
            </div>
            <div className="gallery-item">
              <img src={require('../photos/blue.jpg')} alt="Blue Bottle Ginza" />
              <div className="caption">Blue Bottle Ginza</div>
            </div>
            <div className="gallery-item">
              <img src={require('../photos/movement.jpg')} alt="Coffee Movement" />
              <div className="caption">Coffee Movement</div>
            </div>
            <div className="gallery-item">
              <img src={require('../photos/loquat.jpg')} alt="Loquat Coffee" />
              <div className="caption">Loquat Coffee</div>
            </div>
            <div className="gallery-item">
              <img src={require('../photos/yeems.PNG')} alt="Loquat Coffee" />
              <div className="caption">Yeems Coffee</div>
            </div>
            <div className="gallery-item">
              <img src={require('../photos/reca.PNG')} alt="Loquat Coffee" />
              <div className="caption">Re Ca Phe</div>
            </div>
            <div className="gallery-item">
              <img src={require('../photos/pulley.PNG')} alt="Loquat Coffee" />
              <div className="caption">Pulley Coffee Bar</div>
            </div>
            <div className="gallery-item">
              <img src={require('../photos/thyme.PNG')} alt="Loquat Coffee" />
              <div className="caption">3 Thyme Coffee</div>
            </div>
            <div className="gallery-item">
              <img src={require('../photos/home.jpg')} alt="Home Coffee Roastery" />
              <div className="caption">Home Coffee Roastery</div>
            </div>
            <div className="gallery-item">
              <img src={require('../photos/maru.jpg')} alt="Maru Coffee" />
              <div className="caption">Maru Coffee</div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p>&copy; 2024 Coffee Shops</p>
      </footer>
    </div>
  );
}

export default CoffeeShops;
