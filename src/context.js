import React, { useState, Component } from 'react';
import items from './data';

const RoomContext = React.createContext();

export default class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: 'all',
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false,
  };

  componentDidMount() {
    let rooms = this.formatData(items);
    let featuredRooms = rooms.filter((room) => room.featured === true);

    let maxPrice = Math.max(...rooms.map((item) => item.price));
    let maxSize = Math.max(...rooms.map((item) => item.size));
    this.setState({
      rooms,
      featuredRooms,
      sortedRooms: rooms,
      loading: false,
      //
      price: maxPrice,
      maxPrice,
      maxSize,
    });
  }

  formatData(items) {
    let tempItems = items.map((item) => {
      let id = item.sys.id;
      let images = item.fields.images.map((image) => image.fields.file.url);

      let room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  }

  getRoom = (slug) => {
    let tempRooms = [...this.state.rooms];
    const room = tempRooms.find((room) => room.slug === slug);
    return room;
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log(name, value);

    console.log(this.state);
    this.setState(
      {
        [name]: value,
      },
      this.filterRooms
    );

    console.log(this.state);
  };

  filterRooms = () => {
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets,
    } = this.state;

    let tempRooms = [...rooms];
    // get capacity
    capacity = parseInt(capacity);
    price = parseInt(price);
    // filter by type
    if (type !== 'all') {
      tempRooms = tempRooms.filter((room) => room.type === type);
    }
    // filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter((room) => room.capacity >= capacity);
    }
    // filter by price
    tempRooms = tempRooms.filter((room) => room.price <= price);
    //filter by size
    tempRooms = tempRooms.filter(
      (room) => room.size >= minSize && room.size <= maxSize
    );
    //filter by breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter((room) => room.breakfast === true);
    }
    //filter by pets
    if (pets) {
      tempRooms = tempRooms.filter((room) => room.pets === true);
    }
    this.setState({
      sortedRooms: tempRooms,
    });
  };

  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange,
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

export { RoomConsumer, RoomContext };

export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <RoomConsumer>
        {(value) => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
}

// const RoomProvider = (props) => {
//   const [rooms, setRooms] = useState([]);
//   const [sortedRooms, setSortedRooms] = useState([]);
//   const [featuredRooms, setFeaturedRooms] = useState([]);
//   const [filteredRooms, setFilteredRooms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [type, setType] = useState('all');
//   const [capacity, setCapacity] = useState(1);
//   const [price, setPrice] = useState(0);
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(0);
//   const [minSize, setMinSize] = useState(0);
//   const [maxSize, setMaxSize] = useState(0);
//   const [breakfast, setBreakfast] = useState(false);
//   const [pets, setPets] = useState(false);

//   const formatData = (items) => {
//     let tempItems = items.map((item) => {
//       let id = item.sys.id;
//       let images = item.fields.images.map((image) => image.fields.file.url);

//       let room = { ...item.fields, images, id };
//       return room;
//     });
//     return tempItems;
//   };

//   useState(() => {
//     let rooms = formatData(items);
//     let featuredRooms = rooms.filter((room) => room.featured === true);

//     let maxPrice = Math.max(...rooms.map((item) => item.price));
//     let maxSize = Math.max(...rooms.map((item) => item.size));

//     setRooms(rooms);
//     setFeaturedRooms(featuredRooms);
//     setSortedRooms(rooms);
//     setSortedRooms(rooms);
//     setLoading(false);
//     setPrice(maxPrice);
//     setMaxPrice(maxPrice);
//     setMaxSize(maxSize);
//   });

//   const getRoom = (slug) => {
//     let tempRooms = [...rooms];
//     const room = tempRooms.find((room) => room.slug === slug);
//     return room;
//   };

//   const filterRooms = () => {
//     let tempRooms = [...rooms];
//     // get capacity
//     setCapacity(parseInt(capacity));
//     setPrice(parseInt(price));

//     // filter by type
//     if (type !== 'all') {
//       tempRooms = tempRooms.filter((room) => room.type === type);
//     }

//     // filter by capacity
//     if (capacity !== 1) {
//       tempRooms = tempRooms.filter((room) => room.capacity >= capacity);
//     }

//     // filter by price
//     tempRooms = tempRooms.filter((room) => room.price <= price);

//     //filter by size
//     tempRooms = tempRooms.filter(
//       (room) => room.size >= minSize && room.size <= maxSize
//     );

//     //filter by breakfast
//     if (breakfast) {
//       tempRooms = tempRooms.filter((room) => room.breakfast === true);
//     }

//     //filter by pets
//     if (pets) {
//       tempRooms = tempRooms.filter((room) => room.pets === true);
//     }

//     setSortedRooms(tempRooms);
//   };

//   const handleChange = (event) => {
//     const target = event.target;
//     const value = target.type === 'checkbox' ? target.checked : target.value;
//     const name = target.name;
//     console.log(name, value);

//     name === breakfast ? setBreakfast(true) : setPets(true);
//     setFilteredRooms(filterRooms);
//   };

//   return (
//     <RoomContext.Provider
//       value={{
//         rooms,
//         sortedRooms,
//         featuredRooms,
//         loading,
//         type,
//         capacity,
//         price,
//         minPrice,
//         maxPrice,
//         minSize,
//         maxSize,
//         breakfast,
//         pets,
//         getRoom: getRoom,
//         handleChange: handleChange,
//       }}
//     >
//       {props.children}
//     </RoomContext.Provider>
//   );
// };

// export default RoomProvider;

// const RoomConsumer = RoomContext.Consumer;

// export { RoomConsumer, RoomContext };

// export function withRoomConsumer(Component) {
//   return function ConsumerWrapper(props) {
//     return (
//       <RoomConsumer>
//         {(value) => <Component {...props} context={value} />}
//       </RoomConsumer>
//     );
//   };
// }
