import React, { Component } from 'react'

export default class Newsitems extends Component {

  render() {
    let  {title,discription,imageUrl,newsUrl,source,date,author} = this.props;
    return (
      <div className='my-3'>
      <div className="card" >
  <img src={imageUrl?imageUrl : "https://storage.googleapis.com/afs-prod/media/89d0aaf56e2145e8a02e5cccf2c877ac/3000.jpeg"} className="card-img-top" alt="..."/>
  <div className="card-body text-center">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{discription}</p>
    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:"90%",}}>
    <span className="badge">{source}</span>
    <span className="visually-hidden">unread messages</span>
  </span>
    <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-dark">Read more</a>
    <p className="card-text"><small className="text-muted">Last updated by {author} at {new Date(date).toGMTString()}</small></p>
  </div>
</div>
      </div>
    )
  }
}
