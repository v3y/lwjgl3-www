import React from 'react'

export default class Copyright extends React.PureComponent {

  render() {
    return (
      <section className="copyright">
        <div className="container">
          <p>Copyright &copy; 2012-{new Date().getFullYear()} Lightweight Java Game Library 3</p>
          <p>Licensed under GPL</p>
        </div>
      </section>
    );
  }
}