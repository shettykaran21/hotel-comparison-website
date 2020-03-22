import React, { Component } from 'react';
import Title from '../components/Title';
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from 'react-icons/fa';

class Services extends Component {
  state = {
    services: [
      {
        icon: <FaCocktail />,
        title: 'Free Cocktails',
        info:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, magni!'
      },
      {
        icon: <FaHiking />,
        title: 'Hiking!',
        info:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, magni!'
      },
      {
        icon: <FaShuttleVan />,
        title: 'Free Van',
        info:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, magni!'
      },
      {
        icon: <FaBeer />,
        title: 'Cheap beer',
        info:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, magni!'
      }
    ]
  };

  render() {
    return (
      <section className="services">
        <Title title="services" />
        <div className="services-center">
          {this.state.services.map((item, index) => {
            return (
              <article key={index} className="service">
                <span>{item.icon}</span>
                <h6>{item.title}</h6>
                <p>{item.info}</p>
              </article>
            );
          })}
        </div>
      </section>
    );
  }
}

export default Services;
