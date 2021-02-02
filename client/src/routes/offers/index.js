import React from 'react';


import '../../styles/offer.css'

const Offers = () => {


  return (
    <div id="offer-container">
      <header>
        <Link className="button" to="/">LOGIN</Link>
      </header>


        <form className="offer-form" >

          <fieldset>
            <legend>Offer bid:</legend>

            <div className="input-block">
              <label htmlFor="price">Price: </label>
              <input
                type="text"
                id="price"
              />
              <strong>$/sac</strong>

            </div>
            <div className="input-block">

              <label htmlFor="yield">Yield: </label>
              <input
                type="text"
                id="yield"
              />
              <strong>sac</strong>
            </div>

            <p>TOTAL:XXXX$</p>

            <h3>Pay with:</h3>

            <div className="input-block">
              <input type="radio" name="pay" id="paypal" />
              <label htmlFor="paypal"> PayPal</label>
            </div>

            <div className="input-block">
              <input type="radio" name="pay" id="credit" />
              <label htmlFor="credit"> Credit</label>
            </div>

            <h3>Login PayPal:</h3>
            <div className="input-block">
              <label htmlFor="user">User: </label>
              <input
                type="text"
                id="user"
              />
            </div>

            <div className="input-block">

              <label htmlFor="password">Password: </label>
              <input
                type="password"
                id="password"
              />
            </div>

            <div className="input-block">
              <label htmlFor="number">Card Number: </label>
              <input
                type="text"
                id="number"
              />
            </div>

            <div className="input-block">

              <label htmlFor="name">Name: </label>
              <input
                type="name"
                id="name"
              />
            </div>

          </fieldset>


        </form>
        <button className="confirm-btn">Pay</button>

    </div>

  )
}

export default Offers;