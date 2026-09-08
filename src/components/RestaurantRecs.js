// src/components/RestaurantRecs.js
import React, { useState } from 'react';
import './styles/restaurant.css';

import ramensenPhoto from '../photos/food/ramensen.jpg';
import yakinikuPhoto from '../photos/food/yakiniku.jpg';
import ryanPhoto from '../photos/food/ryan.jpg';
import isshinPhoto from '../photos/food/isshin.jpg';
import quintoPhoto from '../photos/food/quinto.jpg';
import singlethreadPhoto from '../photos/food/singlethread.jpg';
import fourkingsPhoto from '../photos/food/fourkings.jpg';
import znyPhoto from '../photos/food/zny.jpg';
import noodlePhoto from '../photos/food/noodle.jpg';
import ernestPhoto from '../photos/food/ernest.jpg';
import sgdPhoto from '../photos/food/sgd.jpg';
import daehoPhoto from '../photos/food/daeho.jpg';
import dumplingPhoto from '../photos/food/dumpling.jpg';
import marafukuPhoto from '../photos/food/marafuku.jpg';
import alldayPhoto from '../photos/food/allday.jpg';
import hestiaPhoto from '../photos/food/hestia.jpg';
import jeffreysPhoto from '../photos/food/jeffreys.jpg';
import leroyPhoto from '../photos/food/leroy.jpg';
import lapiscinaPhoto from '../photos/food/lapiscina.jpg';
import peacockPhoto from '../photos/food/peacock.jpg';
import fourcharlesPhoto from '../photos/food/fourcharles.jpg';
import malaPhoto from '../photos/food/mala.jpg';
import hanPhoto from '../photos/food/han.jpg';
import lindustriePhoto from '../photos/food/lindustrie.jpg';
import ceresPhoto from '../photos/food/ceres.jpg';
import namiPhoto from '../photos/food/nami.jpg';
import jotocurryPhoto from '../photos/food/jotocurry.jpg';
import kappoPhoto from '../photos/food/kappo.jpg';
import fishPhoto from '../photos/food/fish.jpg';

const REGIONS = [
  { key: 'sf', label: 'Bay Area' },
  { key: 'atx', label: 'Austin' },
  { key: 'japan', label: 'Japan' },
  { key: 'nyc', label: 'New York' },
];

const RESTAURANTS = [
  // Japan
  { name: 'Ramen Sen-no-Kaze', url: null, city: 'Kyoto, Japan', region: 'japan', photo: ramensenPhoto, notes: 'Add your go-to order here' },
  { name: 'Yakiniku Marutomi', url: 'https://yakinikumarutomi.com/', city: 'Kyoto, Japan', region: 'japan', photo: yakinikuPhoto, notes: 'Add your go-to order here' },
  { name: 'Ryan', url: 'https://www.tysons.jp/ryan/', city: 'Shibuya, Tokyo, Japan', region: 'japan', photo: ryanPhoto, notes: 'Add your go-to order here' },
  { name: 'Isshin Daikanyama', url: null, city: 'Daikanyama, Tokyo, Japan', region: 'japan', photo: isshinPhoto, notes: 'Add your go-to order here' },
  { name: '5 Quinto', url: null, city: 'Meguro, Tokyo, Japan', region: 'japan', photo: quintoPhoto, notes: 'Add your go-to order here' },
  { name: 'Joto Curry', url: null, city: 'Shinjuku, Tokyo, Japan', region: 'japan', photo: jotocurryPhoto, notes: 'Add your go-to order here' },

  // Bay Area
  { name: 'SingleThread', url: 'https://singlethreadfarms.com/', city: 'Healdsburg, CA', region: 'sf', photo: singlethreadPhoto, notes: 'Add your go-to order here' },
  { name: 'Four Kings', url: 'https://www.itsfourkings.com/', city: 'San Francisco, CA', region: 'sf', photo: fourkingsPhoto, notes: 'Add your go-to order here' },
  { name: 'Z&Y Peking Duck', url: 'https://zandypekingduck.com/', city: 'San Francisco, CA', region: 'sf', photo: znyPhoto, notes: 'Add your go-to order here' },
  { name: 'Noodle Dynasty', url: 'https://noodledynasty.club/', city: 'Berkeley, CA', region: 'sf', photo: noodlePhoto, notes: 'Add your go-to order here' },
  { name: 'Ernest', url: 'https://www.ernestsf.com/', city: 'San Francisco, CA', region: 'sf', photo: ernestPhoto, notes: 'Add your go-to order here' },
  { name: 'SGD Tofu House', url: 'https://www.sanjosetofuhouse.com/', city: 'San Jose, CA', region: 'sf', photo: sgdPhoto, notes: 'Add your go-to order here' },
  { name: 'Daeho Kalbijjim', url: 'https://www.daeho-kalbijjim.com/', city: 'San Francisco, CA', region: 'sf', photo: daehoPhoto, notes: 'Add your go-to order here' },
  { name: 'Dumpling Home', url: null, city: 'San Francisco, CA', region: 'sf', photo: dumplingPhoto, notes: 'Add your go-to order here' },
  { name: 'Marufuku Ramen', url: 'https://www.marufukuramen.com/sanfrancisco', city: 'San Francisco, CA', region: 'sf', photo: marafukuPhoto, notes: 'Add your go-to order here' },

  // Austin
  { name: 'All Day Pizza', url: 'https://allday.pizza/', city: 'Austin, TX', region: 'atx', photo: alldayPhoto, notes: 'Add your go-to order here' },
  { name: 'Kappo Kappo', url: 'https://kappokappo.com/', city: 'Austin, TX', region: 'atx', photo: kappoPhoto, notes: 'Add your go-to order here' },
  { name: 'Hestia', url: 'https://hestiaaustin.com/', city: 'Austin, TX', region: 'atx', photo: hestiaPhoto, notes: 'Add your go-to order here' },
  { name: "Jeffrey's", url: 'https://jeffreysofaustin.com/', city: 'Austin, TX', region: 'atx', photo: jeffreysPhoto, notes: 'Add your go-to order here' },
  { name: 'LeRoy and Lewis', url: 'https://leroyandlewisbbq.com/', city: 'Austin, TX', region: 'atx', photo: leroyPhoto, notes: 'Add your go-to order here' },
  { name: 'La Piscina', url: 'https://www.bunkhousehotels.com/hotel-magdalena', city: 'Austin, TX', region: 'atx', photo: lapiscinaPhoto, notes: 'Add your go-to order here' },
  { name: 'Peacock Lounge', url: null, city: 'Austin, TX', region: 'atx', photo: peacockPhoto, notes: 'Add your go-to order here' },

  // New York
  { name: '4 Charles Prime Rib', url: 'https://www.nycprimerib.com/', city: 'New York, NY', region: 'nyc', photo: fourcharlesPhoto, notes: 'Add your go-to order here' },
  { name: 'MáLà Project', url: 'https://www.malaproject.com/', city: 'New York, NY', region: 'nyc', photo: malaPhoto, notes: 'Add your go-to order here' },
  { name: 'Her Name Is Han', url: 'https://www.hernameishan.com/', city: 'New York, NY', region: 'nyc', photo: hanPhoto, notes: 'Add your go-to order here' },
  { name: "L'Industrie Pizzeria", url: 'https://www.lindustriebk.com/', city: 'New York, NY', region: 'nyc', photo: lindustriePhoto, notes: 'Add your go-to order here' },
  { name: 'Ceres', url: 'https://www.ceres.nyc/', city: 'New York, NY', region: 'nyc', photo: ceresPhoto, notes: 'Add your go-to order here' },
  { name: 'Nami Nori', url: 'https://www.naminori.us/', city: 'New York, NY', region: 'nyc', photo: namiPhoto, notes: 'Add your go-to order here' },
  { name: 'Fish Cheeks', url: 'https://www.fishcheeksnyc.com/', city: 'New York, NY', region: 'nyc', photo: fishPhoto, notes: 'Add your go-to order here' },
];

function RestaurantRecs() {
  const [region, setRegion] = useState('sf');

  const shown = RESTAURANTS.filter((r) => r.region === region);

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

      <section id="restaurant-recs">
        <h2>My Favorite Restaurants Ranked!!!</h2>

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

        {shown.length === 0 ? (
          <p className="empty-region">Haven't added spots for this region yet!</p>
        ) : (
          <div className="restaurant-grid">
            {shown.map((r) => (
              <div className="restaurant-card" key={r.name}>
                <div className="restaurant-card-photo">
                  {r.photo ? (
                    <img src={r.photo} alt={r.name} />
                  ) : (
                    <div className="restaurant-card-photo-placeholder">No photo yet</div>
                  )}
                </div>
                <div className="restaurant-card-body">
                  <h3>
                    {r.url ? (
                      <a href={r.url} target="_blank" rel="noopener noreferrer">{r.name}</a>
                    ) : (
                      r.name
                    )}
                  </h3>
                  <p className="restaurant-card-city">{r.city}</p>
                  <p className="restaurant-card-notes">{r.notes}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer>
        <p>&copy; 2026 Restaurant Recs</p>
      </footer>
    </div>
  );
}

export default RestaurantRecs;
