// import { Button, Form, Modal, Alert, Row, Col } from 'react-bootstrap';
// import React, { useContext, useRef, useState } from 'react';
// import { AuthContext } from '../../context/AuthContext';
// import { convert_to_milliseconds } from './utils';

// export const AddAuction = ({ setAuction }) => {
//   const [showForm, setShowForm] = useState(false);
//   const [error, setError] = useState('');

//   const itemTitle = useRef();
//   const itemDesc = useRef();
//   const startPrice = useRef();
//   const itemHours = useRef();
//   const itemMinutes = useRef();
//   const itemImage = useRef();

//   const { currentUser } = useContext(AuthContext);

//   const openForm = () => setShowForm(true);
//   const closeForm = () => setShowForm(false);

//   const imgTypes = ['image/png', 'image/jpeg', 'image/jpg'];

//   const submitForm = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (!imgTypes.includes(itemImage.current.files[0].type)) {
//       return setError('Please use a valid image(png,jpeg or jpg)');
//     }

//     let currentDate = new Date();
//     let dueDate = currentDate.setHours(
//       currentDate.getHours() + parseInt(itemHours.current.value)
//     );
//     dueDate = currentDate.setMinutes(
//       currentDate.getMinutes() + parseInt(itemMinutes.current.value)
//     );

//     let newAuction = {
//       email: currentUser.email,
//       title: itemTitle.current.value,
//       desc: itemDesc.current.value,
//       curPrice: startPrice.current.value,
//       duration: dueDate,
//       itemImage: itemImage.current.files[0],
//       bidCount: 0,
//     };

//     setAuction(newAuction);
//     closeForm();
//   };

//   return (
//     <>
//       <div className="col d-flex justify-content-center my-3">
//         <div onClick={openForm} className="btn btn-outline-secondary mx-2">
//           Add Auction
//         </div>
//       </div>
//       <Modal centered show={showForm} onHide={closeForm}>
//         <form onSubmit={submitForm}>
//           <Modal.Header>
//             <Modal.Title>Create Auction</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             {error && <Alert variant="danger">{error}</Alert>}
//             <Row>
//               <Col>
//                 <Form.Group>
//                   <Form.Label>Item Title</Form.Label>
//                   <Form.Control type="text" required ref={itemTitle} />
//                 </Form.Group>
//               </Col>
//               <Col>
//                 <Form.Group>
//                   <Form.Label>Item Description</Form.Label>
//                   <Form.Control type="text" required ref={itemDesc} />
//                 </Form.Group>
//               </Col>
//             </Row>
//             <Row>
//               <Col>
//                 <Form.Group>
//                   <Form.Label>Starting Price</Form.Label>
//                   <Form.Control type="number" required ref={startPrice} />
//                 </Form.Group>
//               </Col>
//               <Col>
//                 <Form.Group>
//                   <Form.Label>Duration in hours</Form.Label>
//                   <Form.Control type="number" required ref={itemHours} />
//                 </Form.Group>
//               </Col>
//               <Col>
//                 <Form.Group>
//                   <Form.Label>Minutes</Form.Label>
//                   <Form.Control type="number" required ref={itemMinutes} />
//                 </Form.Group>
//               </Col>
//             </Row>
//             <Row>
//               <Col>
//                 <Form.Group>
//                   <Form.Label>Seller</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={currentUser.email}
//                     readOnly
//                   />
//                 </Form.Group>
//               </Col>
//               <Col>
//                 <Form.Group>
//                   <Form.Label>Item Image</Form.Label>
//                   <Form.File
//                     label="Select Item Image"
//                     custom
//                     required
//                     ref={itemImage}
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={closeForm}>
//               Cancel
//             </Button>
//             <Button variant="primary" type="submit">
//               Submit
//             </Button>
//           </Modal.Footer>
//         </form>
//       </Modal>
//     </>
//   );
// };


import { Button, Form, Modal, Alert, Row, Col } from 'react-bootstrap';
import React, { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import firebase from 'firebase/app';
import 'firebase/database';

export const AddAuction = ({ setAuction }) => {
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  const itemTitle = useRef();
  const itemDesc = useRef();
  const startPrice = useRef();
  const itemHours = useRef();
  const itemMinutes = useRef();
  const itemImage = useRef();

  const { currentUser } = useContext(AuthContext);

  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);

  const imgTypes = ['image/png', 'image/jpeg', 'image/jpg'];

  const submitForm = async (e) => {
    e.preventDefault();
    setError('');

    if (!imgTypes.includes(itemImage.current.files[0].type)) {
      return setError('Please use a valid image(png, jpeg, or jpg)');
    }

    const currentDate = new Date();
    const dueDate = new Date();
    dueDate.setHours(
      currentDate.getHours() + parseInt(itemHours.current.value)
    );
    dueDate.setMinutes(
      currentDate.getMinutes() + parseInt(itemMinutes.current.value)
    );

    const newAuction = {
      email: currentUser.email,
      title: itemTitle.current.value,
      desc: itemDesc.current.value,
      curPrice: parseFloat(startPrice.current.value),
      duration: dueDate.getTime(), // Storing in milliseconds
      itemImage: itemImage.current.files[0],
      bidCount: 0, // Initial bid count
    };

    setAuction(newAuction);
    closeForm();
  };

  return (
    <>
      <div className="col d-flex justify-content-center my-3">
        <div onClick={openForm} className="btn btn-outline-secondary mx-2">
          Add Auction
        </div>
      </div>
      <Modal centered show={showForm} onHide={closeForm}>
        <form onSubmit={submitForm}>
          <Modal.Header>
            <Modal.Title>Create Auction</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Item Title</Form.Label>
                  <Form.Control type="text" required ref={itemTitle} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Item Description</Form.Label>
                  <Form.Control type="text" required ref={itemDesc} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Starting Price</Form.Label>
                  <Form.Control type="number" required ref={startPrice} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Duration in hours</Form.Label>
                  <Form.Control type="number" required ref={itemHours} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Minutes</Form.Label>
                  <Form.Control type="number" required ref={itemMinutes} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Seller</Form.Label>
                  <Form.Control
                    type="text"
                    value={currentUser.email}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Item Image</Form.Label>
                  <Form.File
                    label="Select Item Image"
                    custom
                    required
                    ref={itemImage}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeForm}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

