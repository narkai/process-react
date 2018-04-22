import React from 'react'

import { connect } from 'react-redux'

import {
  productsFetch
} from './index'

class App extends React.Component
{
  constructor(props)
  {
    super(props)
    this.fetch = this.fetch.bind(this)
  }

  fetch()
  {
    const {
      productsFetch
    } = this.props

    productsFetch()
  }

  render()
  {
    const {
      products, productsFetching
    } = this.props

    let list
    if (productsFetching) {
      list = <p> fetching... </p>
    } else if (products) {
      list = products.map((product, i) => {
        let title = product.title
        let images = product.images.map((image, j) => {
          return (
            <li key={j}>
              <img src={image.thumb.httpUrl}/>
            </li>
          )
        })
        return (
          <li key={i}>
            {title}
            <ul>
              {images}
            </ul>
          </li>
        )
      })
      console.log(products)
    }

    return (
      <div style={{ margin: '1em' }}>
        <button onClick={this.fetch}>
          Fetch products
        </button>
        <ul>
          {list}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  products: state.products.products,
  productsFetching: state.products.fetching
})

const mapDispatchToProps = {
  productsFetch: productsFetch
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
