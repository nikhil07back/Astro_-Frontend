import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, FormCheck, Form, Button, Spinner } from 'react-bootstrap';
const SkeletonLoader = () => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7].map((_, index) => (
        <tr key={index}>
          <td><SkeletonElement /></td>
          <td><SkeletonElement /></td>
          <td><SkeletonElement /></td>
          <td><SkeletonElement /></td>
          <td><SkeletonElement /></td>
        </tr>
      ))}
    </>
  );
};
const SkeletonElement = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ width: '100%', padding: '8px 0' }}>
        <SkeletonLine />
      </div>
    </div>
  );
};
const SkeletonLine = () => {
  return <div style={{ width: '100%', height: '16px', backgroundColor: '#F0F0F0', borderRadius: '4px' }} />;
};
const Timeslot = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const initialTimeSlots = {
    startTime: '9:00 AM',
    teaBreak: '10:30 AM',
    lunchBreak: '1:00 PM',
    endTime: '5:00 PM',
  };
  const [timeSlots, setTimeSlots] = useState(Array(7).fill(initialTimeSlots));
  const [isSwitch, setIsSwitch] = useState(Array(7).fill(true));
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  const handleApplyTime = (field) => {
    const firstTimeValue = timeSlots[0][field];
  };
  const handleSwitchChange = (index) => {
    setIsSwitch((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      setTimeSlots((timeSlots) =>
        timeSlots.map((item, i) => {
          if (i === index && !newState[index]) {
            return {
              startTime: '',
              teaBreak: '',
              lunchBreak: '',
              endTime: '',
            };
          }
          return item;
        })
      );
      return newState;
    });
  };
  const handleSave = () => {
    console.log('Saving...');
  };
  return (
    <Container>
      <Row>
        <Col style={{ textAlign: 'center' }}>
          <Table bordered>
            <thead style={{ textAlign: 'center' }}>
              <tr>
                <th>Day</th>
                <th onClick={() => handleApplyTime('')}>Start Time</th>
                <th onClick={() => handleApplyTime('')}>Tea Break</th>
                <th onClick={() => handleApplyTime('')}>Lunch Break</th>
                <th onClick={() => handleApplyTime('')}>End Time</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <SkeletonLoader />
              ) : (
                days.map((day, index) => (
                  <tr key={index}>
                    <td style={{ display: 'flex', alignItems: 'center' }}>
                      {day}
                      <FormCheck
                        style={{ marginLeft: 'auto' }}
                        type='switch'
                        checked={isSwitch[index]}
                        onChange={() => handleSwitchChange(index)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type='time'
                        value={timeSlots[index].startTime}
                        onChange={(e) =>
                          setTimeSlots((timeSlots) =>
                            timeSlots.map((item, i) =>
                              i === index ? { ...item, startTime: e.target.value } : item
                            )
                          )
                        }
                        disabled={!isSwitch[index]}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type='time'
                        value={timeSlots[index].teaBreak}
                        onChange={(e) =>
                          setTimeSlots((timeSlots) =>
                            timeSlots.map((item, i) =>
                              i === index ? { ...item, teaBreak: e.target.value } : item
                            )
                          )
                        }
                        disabled={!isSwitch[index]}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type='time'
                        value={timeSlots[index].lunchBreak}
                        onChange={(e) =>
                          setTimeSlots((timeSlots) =>
                            timeSlots.map((item, i) =>
                              i === index ? { ...item, lunchBreak: e.target.value } : item
                            )
                          )
                        }
                        disabled={!isSwitch[index]}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type='time'
                        value={timeSlots[index].endTime}
                        onChange={(e) =>
                          setTimeSlots((timeSlots) =>
                            timeSlots.map((item, i) =>
                              i === index ? { ...item, endTime: e.target.value } : item
                            )
                          )
                        }
                        disabled={!isSwitch[index]}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
          <div style={{ textAlign: 'right' }}>
            <Button variant='primary' onClick={handleSave}>
              Save
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default Timeslot; 



