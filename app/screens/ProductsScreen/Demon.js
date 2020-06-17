// import {
//   createCollapsibleStack,
//   // disableExpoTranslucentStatusBar,
// } from 'react-navigation-collapsible';
// import {NavigationContainer} from '@react-navigation/native';

// /* Expo only: If you disabled Expo's default translucent statusBar, please call this function as well.
// disableExpoTranslucentStatusBar();
// */

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         /* Wrap your Stack.Screen */
//         {createCollapsibleStack(
//           <Stack.Screen
//             name="HomeScreen"
//             component={MyScreen}
//             options={{
//               headerStyle: {backgroundColor: 'green'},
//               title: 'Home',
//             }}
//           />,
//           {
//             collapsedColor: 'red' /* Optional */,
//             useNativeDriver: true /* Optional, default: true */,
//             key:
//               'HomeScreen' /* Optional, a key for your Stack.Screen element */,
//           },
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
