// import React, { useState } from 'react';
// import { ReactDiagram } from 'gojs-react';
// import * as go from 'gojs';

// const OnlyShow = () => {
//   const [modelData, setModelData] = useState({
//     nodeDataArray: [
//       { key: 'Start', text: 'Start', category: 'decision', isExpanded: true },
//     ],
//     linkDataArray: [],
//   });

//   const toggleChildNodes = (parentKey) => {
//     setModelData((prevData) => {
//       const parentNode = prevData.nodeDataArray.find((node) => node.key === parentKey);

//       if (parentNode.isExpanded) {
//         // Collapse: Remove child nodes and links
//         const updatedNodes = prevData.nodeDataArray.filter(
//           (node) => !node.key.startsWith(parentKey) || node.key === parentKey
//         );
//         const updatedLinks = prevData.linkDataArray.filter(
//           (link) => link.from !== parentKey
//         );

//         return {
//           nodeDataArray: updatedNodes.map((node) =>
//             node.key === parentKey ? { ...node, isExpanded: false } : node
//           ),
//           linkDataArray: updatedLinks,
//         };
//       } else {
//         // Expand: Add child nodes and links
//         const newNodes = [];
//         const newLinks = [];

//         if (parentKey === 'Start') {
//           newNodes.push(
//             { key: 'I', text: 'Introversion', category: 'decision', isExpanded: true },
//             { key: 'E', text: 'Extraversion', category: 'decision', isExpanded: true }
//           );
//           newLinks.push(
//             { from: 'Start', to: 'I', key: 'Start-I' },
//             { from: 'Start', to: 'E', key: 'Start-E' }
//           );
//         } else if (parentKey === 'I') {
//           newNodes.push(
//             { key: 'IN', text: 'Intuition', category: 'decision', isExpanded: true },
//             { key: 'IS', text: 'Sensing', category: 'decision', isExpanded: true }
//           );
//           newLinks.push(
//             { from: 'I', to: 'IN', key: 'I-IN' },
//             { from: 'I', to: 'IS', key: 'I-IS' }
//           );
//         } else if (parentKey === 'E') {
//           newNodes.push(
//             { key: 'EN', text: 'Intuition', category: 'decision', isExpanded: true },
//             { key: 'ES', text: 'Sensing', category: 'decision', isExpanded: true }
//           );
//           newLinks.push(
//             { from: 'E', to: 'EN', key: 'E-EN' },
//             { from: 'E', to: 'ES', key: 'E-ES' }
//           );
//         }

//         return {
//           nodeDataArray: [
//             ...prevData.nodeDataArray.map((node) =>
//               node.key === parentKey ? { ...node, isExpanded: true } : node
//             ),
//             ...newNodes,
//           ],
//           linkDataArray: [...prevData.linkDataArray, ...newLinks],
//         };
//       }
//     });
//   };

//   const initDiagram = () => {
//     const $ = go.GraphObject.make;

//     const diagram = $(go.Diagram, {
//       layout: $(
//         go.TreeLayout,
//         {
//           angle: 0, // Start from the left side
//           arrangement: go.TreeLayout.ArrangementVertical,
//         }
//       ),
//       'undoManager.isEnabled': true,
//       initialContentAlignment: go.Spot.Left, // Align content to the left
//     });

//     diagram.animationManager.isEnabled = true; // Enable animations
//     diagram.animationManager.duration = 300; // Set animation duration (in milliseconds)

//     diagram.model = $(go.GraphLinksModel, {
//       linkKeyProperty: 'key',
//       nodeDataArray: modelData.nodeDataArray,
//       linkDataArray: modelData.linkDataArray,
//     });

//     diagram.nodeTemplate = $(
//       go.Node,
//       'Auto',
//       $(go.Shape, 'Rectangle', { fill: 'white', stroke: 'lightgray', strokeWidth: 1 }),
//       $(
//         go.Panel,
//         'Table',
//         { defaultAlignment: go.Spot.Center, padding: 5 },
//         // Text block for the main label
//         $(
//           go.TextBlock,
//           {
//             row: 0,
//             column: 0,
//             columnSpan: 2,
//             font: 'bold 14px sans-serif',
//             margin: 5,
//             alignment: go.Spot.Center,
//           },
//           new go.Binding('text', 'text')
//         ),
//         // Button for "Introversion"
//         $(
//           go.Panel,
//           'Horizontal',
//           { row: 1, column: 0, alignment: go.Spot.Center, margin: 5 },
//           $(
//             go.TextBlock,
//             {
//               text: 'Introversion',
//               font: '12px sans-serif',
//               stroke: 'black',
//               background: '#f0f0f0',
//               margin: new go.Margin(2, 5, 2, 5),
//               cursor: 'pointer',
//               click: (e, obj) => {
//                 const node = obj.part;
//                 const parentKey = node.data.key;
//                 toggleChildNodes(parentKey);
//               },
//             }
//           )
//         ),
//         // Button for "Extraversion"
//         $(
//           go.Panel,
//           'Horizontal',
//           { row: 2, column: 0, alignment: go.Spot.Center, margin: 5 },
//           $(
//             go.TextBlock,
//             {
//               text: 'Extraversion',
//               font: '12px sans-serif',
//               stroke: 'black',
//               background: '#f0f0f0',
//               margin: new go.Margin(2, 5, 2, 5),
//               cursor: 'pointer',
//               click: (e, obj) => {
//                 const node = obj.part;
//                 const parentKey = node.data.key;
//                 toggleChildNodes(parentKey);
//               },
//             }
//           )
//         )
//       )
//     );

//     diagram.linkTemplate = $(
//       go.Link,
//       { routing: go.Link.Orthogonal, corner: 5 }, // Orthogonal links with rounded corners
//       $(go.Shape, { strokeWidth: 2, stroke: '#555' }),
//       $(go.Shape, { toArrow: 'Standard' })
//     );

//     return diagram;
//   };

//   return (
//     <div style={{ width: '100%', height: '600px' }}>
//       <ReactDiagram
//         initDiagram={initDiagram}
//         divClassName="diagram-component"
//         nodeDataArray={modelData.nodeDataArray}
//         linkDataArray={modelData.linkDataArray}
//         style={{ width: '100%', height: '100%' }}
//       />
//     </div>
//   );
// };

// export default OnlyShow;

// import React from 'react'
// import OsintemailalldetailsChart from '../ViewPage/Osintemailalldetails/index3'

// export default function OnlyShow() {
//   return (
//     <>
//       hello
//       <OsintemailalldetailsChart/>
//     </>
//   )
// }

// import React, { useState, useEffect, useRef } from 'react';
// import { GoogleMap, LoadScript, DrawingManager } from '@react-google-maps/api';
// import CONFIG from 'Config';

// const GOOGLE_MAPS_API_KEY = CONFIG.MAPS_APIKEY;

// const GeofenceMap = () => {
//   const mapRef = useRef(null);
//   const [drawingManager, setDrawingManager] = useState(null);
//   const [allShapes, setAllShapes] = useState([]);
//   const [selectedShape, setSelectedShape] = useState(null);
//   const [map, setMap] = useState(null);
//   const [currentLat, setCurrentLat] = useState(37.7749);
//   const [currentLng, setCurrentLng] = useState(-122.4194);
//   const [savedShapes, setSavedShapes] = useState([]);

//   useEffect(() => {
//     const storedShapes = localStorage.getItem('geofenceShapes');
//     if (storedShapes) {
//       const shapes = JSON.parse(storedShapes);
//       setSavedShapes(shapes);
//       loadShapesOnMap(shapes);
//     }
//   }, [map]);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setCurrentLat(position.coords.latitude);
//           setCurrentLng(position.coords.longitude);
//         },
//         () => {
//           setCurrentLat(37.7749);
//           setCurrentLng(-122.4194);
//         }
//       );
//     }
//   }, []);

//   useEffect(() => {
//     if (map && window.google) {
//       const manager = new window.google.maps.drawing.DrawingManager({
//         drawingMode: null,
//         drawingControl: true,
//         drawingControlOptions: {
//           position: window.google.maps.ControlPosition.TOP_CENTER,
//           drawingModes: ['polygon'],
//         },
//         polygonOptions: {
//           fillColor: '#FF0000',
//           fillOpacity: 0.35,
//           strokeWeight: 2,
//           clickable: true,
//           editable: true,
//           draggable: true,
//         },
//       });

//       setDrawingManager(manager);
//       manager.setMap(map);

//       window.google.maps.event.addListener(manager, 'overlaycomplete', (event) => {
//         const newShape = event.overlay;
//         setAllShapes((prev) => [...prev, newShape]);

//         window.google.maps.event.addListener(newShape, 'click', () => {
//           if (selectedShape) {
//             selectedShape.setOptions({ strokeColor: '#0000FF' });
//           }
//           setSelectedShape(newShape);
//           newShape.setOptions({ strokeColor: '#FF0000' });
//         });
//       });
//     }
//   }, [map]);

//   const loadShapesOnMap = (shapes) => {
//     if (!window.google || !map) return;

//     const loaded = [];
//     shapes.forEach((shape) => {
//       if (shape.type === 'polygon') {
//         const polygon = new window.google.maps.Polygon({
//           paths: shape.coordinates,
//           fillColor: '#FF0000',
//           fillOpacity: 0.35,
//           strokeWeight: 2,
//           clickable: true,
//           editable: true,
//           draggable: true,
//         });

//         polygon.setMap(map);

//         window.google.maps.event.addListener(polygon, 'click', () => {
//           if (selectedShape) {
//             selectedShape.setOptions({ strokeColor: '#0000FF' });
//           }
//           setSelectedShape(polygon);
//           polygon.setOptions({ strokeColor: '#FF0000' });
//         });

//         loaded.push(polygon);
//       }
//     });

//     setAllShapes((prev) => [...prev, ...loaded]);
//   };

//   const getPolygonCoordinates = (polygon) => {
//     const paths = polygon.getPath();
//     let coordinates = [];
//     paths.forEach((latLng) => {
//       coordinates.push({ lat: latLng.lat(), lng: latLng.lng() });
//     });
//     return coordinates;
//   };

//   const handleSubmit = () => {
//     if (allShapes.length === 0) {
//       alert('Please draw at least one polygon first.');
//       return;
//     }

//     const newSavedShapes = allShapes.map((shape, i) => ({
//       type: 'polygon' + (i + 1),
//       coordinates: getPolygonCoordinates(shape),
//     }));
//     localStorage.setItem('geofenceShapes', JSON.stringify(newSavedShapes));
//     setSavedShapes(newSavedShapes);

//     alert('Shape(s) saved to local storage!');
//   };

//   const handleDeleteSelectedShape = () => {
//     if (selectedShape) {
//       selectedShape.setMap(null);

//       const updatedShapes = allShapes.filter((shape) => shape !== selectedShape);
//       setAllShapes(updatedShapes);
//       setSelectedShape(null);

//       const updatedSavedShapes = updatedShapes.map((shape) => ({
//         type: 'polygon',
//         coordinates: getPolygonCoordinates(shape),
//       }));
//       setSavedShapes(updatedSavedShapes);
//       localStorage.setItem('geofenceShapes', JSON.stringify(updatedSavedShapes));
//     } else {
//       alert('No shape selected to delete.');
//     }
//   };

//   return (
//     <div className="h-screen relative flex flex-col">
//       <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={['drawing']}>
//         <GoogleMap
//           mapContainerStyle={{ width: '100%', height: '70%' }}
//           center={{ lat: currentLat, lng: currentLng }}
//           zoom={13}
//           onLoad={(mapInstance) => setMap(mapInstance)}
//         >
//           {drawingManager && <DrawingManager manager={drawingManager} />}
//         </GoogleMap>
//       </LoadScript>

//       <div className="flex gap-4 p-4">
//         <button
//           onClick={handleSubmit}
//           className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600"
//         >
//           Submit
//         </button>
//         <button
//           onClick={handleDeleteSelectedShape}
//           className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600"
//         >
//           Delete Selected Shape
//         </button>
//       </div>

//       <div className="h-1/3 overflow-y-auto bg-white border-t p-4">
//         <h2 className="text-xl font-semibold mb-2">Saved Shapes</h2>
//         {savedShapes.length === 0 ? (
//           <p className="text-gray-500">No shapes saved yet.</p>
//         ) : (
//           <table className="min-w-full border text-sm">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="border px-2 py-1 text-left">#</th>
//                 <th className="border px-2 py-1 text-left">Coordinates</th>
//               </tr>
//             </thead>
//             <tbody>
//               {savedShapes.map((shape, index) => (
//                 <tr key={index}>
//                   <td className="border px-2 py-1">{index + 1}</td>
//                   <td className="border px-2 py-1">
//                     {shape.coordinates.map((coord, i) => (
//                       <div key={i}>
//                         ({coord.lat.toFixed(4)}, {coord.lng.toFixed(4)})
//                       </div>
//                     ))}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default GeofenceMap;

// import React, { useState, useEffect, useRef } from 'react';
// import { useDispatch } from 'react-redux';
// import { GoogleMap, LoadScript, DrawingManager } from '@react-google-maps/api';
// import CONFIG from 'Config';
// import { SavePolygons } from 'Store/Reducers/MADSlice';

// const GOOGLE_MAPS_API_KEY = CONFIG.MAPS_APIKEY;

// const GeofenceMap = () => {
//   const dispatch = useDispatch();
//   const mapRef = useRef(null);
//   const [drawingManager, setDrawingManager] = useState(null);
//   const [allShapes, setAllShapes] = useState([]);
//   const [selectedShape, setSelectedShape] = useState(null);
//   const [map, setMap] = useState(null);
//   const [currentLat, setCurrentLat] = useState(37.7749);
//   const [currentLng, setCurrentLng] = useState(-122.4194);
//   const [savedShapes, setSavedShapes] = useState([]);

//   useEffect(() => {
//     const storedShapes = localStorage.getItem('geofenceShapes');
//     if (storedShapes) {
//       const shapes = JSON.parse(storedShapes);
//       setSavedShapes(shapes);
//       loadShapesOnMap(shapes);
//     }
//   }, []);
//   useEffect(() => {
//     if (map && savedShapes.length > 0) {
//       loadShapesOnMap(savedShapes);
//     }
//   }, [map, savedShapes]);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setCurrentLat(position.coords.latitude);
//           setCurrentLng(position.coords.longitude);
//         },
//         () => {
//           setCurrentLat(23.0475181);
//           setCurrentLng(72.5337812);
//         }
//       );
//     }
//   }, []);
//   useEffect(() => {
//     if (map && window.google) {
//       const manager = new window.google.maps.drawing.DrawingManager({
//         drawingMode: null,
//         drawingControl: true,
//         drawingControlOptions: {
//           position: window.google.maps.ControlPosition.TOP_CENTER,
//           drawingModes: ['polygon'],
//         },
//         polygonOptions: {
//           fillColor: '#FF0000',
//           fillOpacity: 0.35,
//           strokeWeight: 2,
//           clickable: true,
//           editable: true,
//           draggable: true,
//         },
//       });

//       setDrawingManager(manager);
//       manager.setMap(map);

//       window.google.maps.event.addListener(manager, 'overlaycomplete', (event) => {
//         const newShape = event.overlay;
//         setAllShapes((prev) => [...prev, newShape]);

//         window.google.maps.event.addListener(newShape, 'click', () => {
//           if (selectedShape) {
//             selectedShape.setOptions({ strokeColor: '#0000FF' });
//           }
//           setSelectedShape(newShape);
//           newShape.setOptions({ strokeColor: '#FF0000' });
//         });
//       });
//     }
//   }, [map]);

//   const loadShapesOnMap = (shapes) => {
//     if (!window.google || !map) return;

//     const loaded = [];
//     shapes.forEach((shape) => {
//       if (shape.name.includes('polygon') || shape.type === 'polygon') {
//         const polygon = new window.google.maps.Polygon({
//           paths: shape.coordinates,
//           fillColor: '#FF0000',
//           fillOpacity: 0.35,
//           strokeWeight: 2,
//           clickable: true,
//           editable: true,
//           draggable: true,
//         });

//         polygon.setMap(map);

//         window.google.maps.event.addListener(polygon, 'click', () => {
//           if (selectedShape) {
//             selectedShape.setOptions({ strokeColor: '#0000FF' });
//           }
//           setSelectedShape(polygon);
//           polygon.setOptions({ strokeColor: '#FF0000' });
//         });

//         loaded.push(polygon);
//       }
//     });

//     setAllShapes((prev) => [...prev, ...loaded]);
//   };

//   const getPolygonCoordinates = (polygon) => {
//     const paths = polygon.getPath();
//     let coordinates = [];
//     paths.forEach((latLng) => {
//       coordinates.push({ lat: latLng.lat(), lng: latLng.lng() });
//     });
//     return coordinates;
//   };

//   const handleSubmit = () => {
//     if (allShapes.length === 0) {
//       alert('Please draw at least one polygon first.');
//       return;
//     }

//     const newSavedShapes = allShapes.map((shape, i) => ({
//       name: `polygon ${i + 1}`,
//       coordinates: getPolygonCoordinates(shape),
//     }));

//     localStorage.setItem('geofenceShapes', JSON.stringify(newSavedShapes));
//     setSavedShapes(newSavedShapes);
//     dispatch(SavePolygons({ userName: 'sagar@fact-byte.com', polygonData: newSavedShapes }))
//       .unwrap()
//       .then((res) => {
//         alert('Shape(s) submitted successfully to the API!');
//       })
//       .catch((err) => {
//         console.error('Submit Error:', err);
//         alert(`Submission failed: ${err.error || err.message}`);
//       });
//   };

//   const handleDeleteSelectedShape = () => {
//     if (selectedShape) {
//       selectedShape.setMap(null);

//       const updatedShapes = allShapes.filter((shape) => shape !== selectedShape);
//       setAllShapes(updatedShapes);
//       setSelectedShape(null);

//       const updatedSavedShapes = updatedShapes.map((shape, i) => ({
//         name: `polygon${i + 1}`,
//         coordinates: getPolygonCoordinates(shape),
//       }));
//       setSavedShapes(updatedSavedShapes);
//       localStorage.setItem('geofenceShapes', JSON.stringify(updatedSavedShapes));
//     } else {
//       alert('No shape selected to delete.');
//     }
//   };

//   return (
//     <div className="h-screen relative flex flex-col">
//       <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={['drawing']}>
//         <GoogleMap
//           mapContainerStyle={{ width: '100%', height: '70%' }}
//           center={{ lat: currentLat, lng: currentLng }}
//           zoom={13}
//           onLoad={(mapInstance) => setMap(mapInstance)}
//         >
//           {drawingManager && <DrawingManager manager={drawingManager} />}
//         </GoogleMap>
//       </LoadScript>

//       <div className="flex gap-4 p-4">
//         <button
//           onClick={handleSubmit}
//           className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600"
//         >
//           Submit
//         </button>
//         <button
//           onClick={handleDeleteSelectedShape}
//           className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600"
//         >
//           Delete Selected Shape
//         </button>
//       </div>

//       <div className="h-1/3 overflow-y-auto bg-white border-t p-4">
//         <h2 className="text-xl font-semibold mb-2">Saved Shapes</h2>
//         {savedShapes.length === 0 ? (
//           <p className="text-gray-500">No shapes saved yet.</p>
//         ) : (
//           <table className="min-w-full border text-sm">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="border px-2 py-1 text-left">#</th>
//                 <th className="border px-2 py-1 text-left">Coordinates</th>
//               </tr>
//             </thead>
//             <tbody>
//               {savedShapes.map((shape, index) => (
//                 <tr key={index}>
//                   <td className="border px-2 py-1">{index + 1}</td>
//                   <td className="border px-2 py-1">
//                     {shape.coordinates.map((coord, i) => (
//                       <div key={i}>
//                         ({coord.lat.toFixed(4)}, {coord.lng.toFixed(4)})
//                       </div>
//                     ))}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default GeofenceMap;

import React from 'react';
import axios from 'axios';

const CreateUserButton = () => {
  const handleCreateUser = async () => {
    try {
      const response = await axios.post(
        'https://fact-byte.com/api/create_individual_user',
        {
          pan_number: 'gjzpm4006g',
          phone: '9876543210',
          email: 'demosd@fact-byte.com',
          name: 'Johbcddfvdcn101',
          Last_name: 'Doddde11',
          password: 'John@1234',
          confirmPassword: 'John@1234',
        },
        {
          headers: {
            // 'Access-Control-Allow-Origin': '*',
            // 'Access-Control-Allow-Methods': 'POST, OPTIONS',
            // 'Access-Control-Allow-Headers': 'Content-Type, application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('User created:', response.data);
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
    }
  };

  return (
    <button className='bg-blue-500 text-white px-4 py-2 rounded' onClick={handleCreateUser}>
      Create User
    </button>
  );
};

export default CreateUserButton;
