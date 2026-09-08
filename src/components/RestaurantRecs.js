// src/components/RestaurantRecs.js
import React, { useState } from 'react';
import './styles/restaurant.css';

import ramensenPhoto from '../photos/food/ramensen.jpg';
import yakinikuPhoto from '../photos/food/yakiniku.jpg';
import ryanPhoto from '../photos/food/ryan.jpg';
import isshinPhoto from '../photos/food/isshin.jpg';
import quintoPhoto from '../photos/food/quinto.jpg';
import jotocurryPhoto from '../photos/food/jotocurry.jpg';
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
import kappoPhoto from '../photos/food/kappo.jpg';
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
import fishPhoto from '../photos/food/fish.jpg';

const REGIONS = [
  { key: 'sf', label: 'Bay Area' },
  { key: 'atx', label: 'Austin' },
  { key: 'japan', label: 'Japan' },
  { key: 'nyc', label: 'New York' },
];

const RESTAURANTS = [
  // Japan
  { name: 'Ramen Sen-no-Kaze', url: null, city: 'Kyoto, Japan', region: 'japan', photo: ramensenPhoto, notes: 'This is my favorite restaurant in the world' },
  { name: 'Yakiniku Marutomi', url: 'https://yakinikumarutomi.com/', city: 'Kyoto, Japan', region: 'japan', photo: yakinikuPhoto, notes: 'Every single meat + yukhoe bibimbap + cold noodle' },
  { name: 'Ryan', url: 'https://www.tysons.jp/ryan/', city: 'Shibuya, Tokyo, Japan', region: 'japan', photo: ryanPhoto, notes: 'Lunch tasting menu' },
  { name: 'Isshin Daikanyama', url: null, city: 'Daikanyama, Tokyo, Japan', region: 'japan', photo: isshinPhoto, notes: 'Mackerel set' },
  { name: '5 Quinto', url: null, city: 'Meguro, Tokyo, Japan', region: 'japan', photo: quintoPhoto, notes: 'Tasting menu' },
  { name: 'Joto Curry', url: null, city: 'Shinjuku, Tokyo, Japan', region: 'japan', photo: jotocurryPhoto, notes: 'Chicken katsu curry with cheese' },

  // Bay Area
  { name: 'SingleThread', url: 'https://singlethreadfarms.com/', city: 'Healdsburg, CA', region: 'sf', photo: singlethreadPhoto, notes: 'Tasting menu THIS MEAL changed my life' },
  { name: 'Four Kings', url: 'https://www.itsfourkings.com/', city: 'San Francisco, CA', region: 'sf', photo: fourkingsPhoto, notes: 'Squab and clay pot rice' },
  { name: 'Z&Y Peking Duck', url: 'https://zandypekingduck.com/', city: 'San Francisco, CA', region: 'sf', photo: znyPhoto, notes: 'The duck' },
  { name: 'Noodle Dynasty', url: 'https://noodledynasty.club/', city: 'Berkeley, CA', region: 'sf', photo: noodlePhoto, notes: 'Whatever this noodle dish was 10/10' },
  { name: 'Ernest', url: 'https://www.ernestsf.com/', city: 'San Francisco, CA', region: 'sf', photo: ernestPhoto, notes: 'Everything' },
  { name: 'SGD Tofu House', url: 'https://www.sanjosetofuhouse.com/', city: 'San Jose, CA', region: 'sf', photo: sgdPhoto, notes: 'Galbi ribs, spicy cold noodle, bibimbap' },
  { name: 'Daeho Kalbijjim', url: 'https://www.daeho-kalbijjim.com/', city: 'San Francisco, CA', region: 'sf', photo: daehoPhoto, notes: 'Galbi jjim' },
  { name: 'Dumpling Home', url: null, city: 'San Francisco, CA', region: 'sf', photo: dumplingPhoto, notes: 'Juicy pork dumpling' },
  { name: 'Marufuku Ramen', url: 'https://www.marufukuramen.com/sanfrancisco', city: 'San Francisco, CA', region: 'sf', photo: marafukuPhoto, notes: 'Deluxe tonkastsu ramen' },

  // Austin
  { name: 'All Day Pizza', url: 'https://allday.pizza/', city: 'Austin, TX', region: 'atx', photo: alldayPhoto, notes: 'Sampler pie. But my favorite is the stracciatella' },
  { name: 'Kappo Kappo', url: 'https://kappokappo.com/', city: 'Austin, TX', region: 'atx', photo: kappoPhoto, notes: 'Tasting menu' },
  { name: 'Hestia', url: 'https://hestiaaustin.com/', city: 'Austin, TX', region: 'atx', photo: hestiaPhoto, notes: 'Wagyu steak' },
  { name: "Jeffrey's", url: 'https://jeffreysofaustin.com/', city: 'Austin, TX', region: 'atx', photo: jeffreysPhoto, notes: 'Wagyu steak' },
  { name: 'LeRoy and Lewis', url: 'https://leroyandlewisbbq.com/', city: 'Austin, TX', region: 'atx', photo: leroyPhoto, notes: 'BACON RIBS and beef cheek. 10/10 no notes' },
  { name: 'La Piscina', url: 'https://www.bunkhousehotels.com/hotel-magdalena', city: 'Austin, TX', region: 'atx', photo: lapiscinaPhoto, notes: 'Steak fajitas' },
  { name: 'Peacock Lounge', url: null, city: 'Austin, TX', region: 'atx', photo: peacockPhoto, notes: 'RICOTTA TOAST' },

  // New York
  { name: '4 Charles Prime Rib', url: 'https://www.nycprimerib.com/', city: 'New York, NY', region: 'nyc', photo: fourcharlesPhoto, notes: 'Burger, ribeye, mac and cheese, brussel sprouts' },
  { name: 'MáLà Project', url: 'https://www.malaproject.com/', city: 'New York, NY', region: 'nyc', photo: malaPhoto, notes: 'I dont remember what we ordered but it was so good' },
  { name: 'Her Name Is Han', url: 'https://www.hernameishan.com/', city: 'New York, NY', region: 'nyc', photo: hanPhoto, notes: 'Literally forgot but everything was good' },
  { name: "L'Industrie Pizzeria", url: 'https://www.lindustriebk.com/', city: 'New York, NY', region: 'nyc', photo: lindustriePhoto, notes: 'Fig Jam & Bacon and Prosciutto burrata slice' },
  { name: 'Ceres', url: 'https://www.ceres.nyc/', city: 'New York, NY', region: 'nyc', photo: ceresPhoto, notes: 'Vodka pizza' },
  { name: 'Nami Nori', url: 'https://www.naminori.us/', city: 'New York, NY', region: 'nyc', photo: namiPhoto, notes: 'Temaki starter set' },
  { name: 'Fish Cheeks', url: 'https://www.fishcheeksnyc.com/', city: 'New York, NY', region: 'nyc', photo: fishPhoto, notes: 'Still thinking about the steamed fish & coconut crab curry' },
];

function RestaurantRecs() {
  const [region, setRegion] = useState('sf');

  const shown = RESTAURANTS.filter((r) => r.region === region);

  return (
    <div>
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
