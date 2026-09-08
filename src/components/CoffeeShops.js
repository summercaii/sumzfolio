// src/components/CoffeeShops.js
import React, { useState } from 'react';
import './styles/coffee.css';

import here from '../photos/here.jpg';
import week from '../photos/week.jpg';
import ralphs from '../photos/ralphs.jpg';
import blue from '../photos/blue.jpg';
import movement from '../photos/movement.jpg';
import home from '../photos/home.jpg';
import yeems from '../photos/yeems.PNG';
import reca from '../photos/reca.PNG';
import thyme from '../photos/thyme.PNG';

const REGIONS = [
  { key: 'sf', label: 'Bay Area' },
  { key: 'la', label: 'Los Angeles' },
  { key: 'atx', label: 'Austin' },
  { key: 'japan', label: 'Japan' },
];

const SHOPS = [
  // Japan
  { name: 'Glitch Coffee & Roasters', url: 'https://glitchcoffee.com/', city: 'Tokyo, Japan', region: 'japan', photo: null, notes: 'Add your order here' },
  { name: 'Here Kyoto', url: 'https://coffeehere.world/', city: 'Kyoto, Japan', region: 'japan', photo: here, notes: 'Add your order here' },
  { name: 'Kurasu Kyoto Stand', url: 'https://jp.kurasu.kyoto/', city: 'Kyoto, Japan', region: 'japan', photo: null, notes: 'Add your order here' },
  { name: 'WEEKENDERS COFFEE TOMINOKOJI', url: 'http://www.weekenderscoffee.com/', city: 'Kyoto, Japan', region: 'japan', photo: week, notes: 'Add your order here' },
  { name: 'Blue Bottle Coffee', url: 'https://bluebottlecoffee.com/', city: 'Ginza, Tokyo, Japan', region: 'japan', photo: blue, notes: 'Add your order here' },
  { name: "Ralph's Coffee", url: 'http://www.ralphs-coffee.com/', city: 'Tokyo, Japan', region: 'japan', photo: ralphs, notes: 'Add your order here' },
  { name: "Wasachi", url: null, city: 'Tokyo, Japan', region: 'japan', photo: null, notes: 'Add your order here' },


  // SF Bay Area
  { name: 'The Coffee Movement', url: 'https://www.thecoffeemovement.com/', city: 'San Francisco, CA', region: 'sf', photo: movement, notes: 'Add your order here' },
  { name: 'Home Coffee Roasters', url: 'http://homecoffeesf.com/', city: 'San Francisco, CA', region: 'sf', photo: home, notes: 'Add your order here' },
  { name: 'Rise & Grind Coffeehouse', url: 'https://www.riseandgrind-sf.com/', city: 'San Francisco, CA', region: 'sf', photo: null, notes: 'Add your order here' },
  { name: 'Kaizen Coffee', url: null, city: 'San Mateo, CA', region: 'sf', photo: null, notes: 'Add your order here' },
  { name: 'Academic Coffee', url: null, city: 'Santa Clara, CA', region: 'sf', photo: null, notes: 'Add your order here' },
  { name: 'Medleno Coffee Shop & Roastery', url: 'http://www.medleno.com/', city: 'Danville, CA', region: 'sf', photo: null, notes: 'Add your order here' },
  { name: 'Voyager Craft Coffee', url: 'https://www.voyagercraftcoffeeorders.com/', city: 'San Jose, CA', region: 'sf', photo: null, notes: 'Add your order here' },

  // LA
  { name: 'Cassel Earth Coffee', url: null, city: 'Irvine, CA', region: 'la', photo: null, notes: 'Add your order here' },
  { name: 'Yeems Coffee', url: 'http://www.yeemscoffee.com/', city: 'Los Angeles, CA', region: 'la', photo: yeems, notes: 'Add your order here' },
  { name: 'Re Ca Phe', url: null, city: 'Fountain Valley, CA', region: 'la', photo: reca, notes: 'Add your order here' },
  { name: '3THYME COFFEE', url: 'https://3thyme.com/index.html/', city: 'Los Angeles, CA', region: 'la', photo: thyme, notes: 'Add your order here' },
  { name: 'Stereoscope Coffee', url: 'https://www.stereoscopecoffee.com/', city: 'Los Angeles, CA', region: 'la', photo: null, notes: 'Add your order here' },
  { name: 'Alchemist Coffee Project', url: 'https://alchemistcp.com/', city: 'Los Angeles, CA', region: 'la', photo: null, notes: 'Add your order here' },
  { name: 'SERIES A Coffee', url: 'https://www.seriesacoffeeca.com/', city: 'Beverly Hills, CA', region: 'la', photo: null, notes: 'Add your order here' },
  { name: 'SORO Coffee', url: 'https://www.sorocoffee.com/', city: 'Los Angeles, CA', region: 'la', photo: null, notes: 'Add your order here' },

  // ATX
  { name: 'Godsent Coffee', url: null, city: 'Austin, TX', region: 'atx', photo: null, notes: 'Add your order here' },
  { name: 'Desnudo Coffee', url: 'https://desnudocoffee.com/', city: 'Austin, TX', region: 'atx', photo: null, notes: 'Add your order here' },
  { name: 'Fleet Coffee', url: 'https://fleetcoffee.com/', city: 'Austin, TX', region: 'atx', photo: null, notes: 'Add your order here' },
  { name: 'Idlewild Coffee', url: 'https://www.idlewildcoffee.com/', city: 'Austin, TX', region: 'atx', photo: null, notes: 'Add your order here' },
];

function CoffeeShops() {
  const [region, setRegion] = useState('sf');

  const shown = SHOPS.filter((s) => s.region === region);

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

        <div className="region-tabs">
          {REGIONS.map((r) => (
            <button
              key={r.key}
              className={`region-tab${region === r.key ? ' active' : ''}`}
              onClick={() => setRegion(r.key)}
            >
              {r.label}
            </button>
          ))}
        </div>

        <div className="coffee-grid">
          {shown.map((shop) => (
            <div className="coffee-card" key={shop.name}>
              <div className="coffee-card-photo">
                {shop.photo ? (
                  <img src={shop.photo} alt={shop.name} />
                ) : (
                  <div className="coffee-card-photo-placeholder">No photo yet</div>
                )}
              </div>
              <div className="coffee-card-body">
                <h3>
                  {shop.url ? (
                    <a href={shop.url} target="_blank" rel="noopener noreferrer">{shop.name}</a>
                  ) : (
                    shop.name
                  )}
                </h3>
                <p className="coffee-card-city">{shop.city}</p>
                <p className="coffee-card-notes">{shop.notes}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer>
        <p>&copy; 2026 Coffee Shops</p>
      </footer>
    </div>
  );
}

export default CoffeeShops;
