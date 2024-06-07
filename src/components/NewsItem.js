import React, { Component } from 'react'

export class NewsItem extends Component {


  render() {
    let {title, description, imageUrl, url, author, date, source} = this.props;
    return (
        <div className="my-3">
            <div className="card" style={{width: "22rem"}}>
                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%', zIndex:'1'}}>
                  {source}
                </span>
                <img src={!imageUrl? "https://cdn.dnaindia.com/sites/default/files/styles/full/public/2020/07/07/912178-afp.jpg" : imageUrl} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-danger">By {author} on {new Date(date).toGMTString()}</small></p>
                    <a href={url} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read more</a>
                </div>
            </div>
        </div>
    )
  }
}

export default NewsItem
