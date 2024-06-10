import React, { Component } from 'react'

export class NewsItem extends Component {


  render() {
    let {title, description, imageUrl, url, author, date, source} = this.props;
    return (
        <div className="my-3 d-flex justify-content-center">
            <div className="card" style={{width: "22rem"}}>

                <div style={{display: 'flex',justifyContent: 'flex-end',position: 'absolute',right: '0'}}>
                    <span className="badge rounded-pill bg-danger">
                      {source}
                    </span>

                </div>

                
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
