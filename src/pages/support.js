import React from 'react';
import Layout from '@theme/Layout';

function Hello() {
  return (
    <Layout title="Hello">
    <div className="container">
        <div className="row">
          <div className="col col--6 col--offset-3 padding-vert--lg">
            <h1>Need Help?</h1>
            <p>MCS is worked on full-time by Perkasa's product infrastructure user interface engineering teams. They're often around and available for questions.</p>

            <h2>Email</h2>
            <p>Please feel free to contact <a href="mailto:eric.elkana@ppu.co.id">eric.elkana@ppu.co.id</a>  for further support, we will do our best to give you a timely answer.</p>

            <h2>Twitter</h2>
            <p><a href="https://twitter.com/search?q=%23mcs">#mcs hash tag on Twitter</a> is used to keep up with the latest MCS news.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Hello;