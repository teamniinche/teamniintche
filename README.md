# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

<!-- // export  function InputWithListAttribute(props){ 
    //     const [state,setState]=useState({val:"",nom:"",label:""})
    //     let name=props.for;
    //     function handleChange(event){
    //         let label=event.target.value===""?"":<>{name} {star}</>
    //         setState({val:event.target.value,nom:event.target.name,label:label})
    //         props.render({val:event.target.value,nom:event.target.name})
    //         }
    //     function handleFocus(){
    //         let label=<>{name} {star}</>
    //         setState({label:label})
    
    //         }
    //     function handleBlur(event){
    //         let label=event.target.value===""?"":<>{name} {star}</>
    //         setState({label:label})
    //         }
    
    //   return (
    //     <div className="div-input">
    //         <label htmlFor={props.for} className="labelInputString" id={props.id} style={styleInputLabel}> {state.label} </label>
    //         <input type={props.type} name={props.for} list={props.list} className="form_input" onBlur={handleBlur} onFocus={handleFocus} onChange={handleChange} placeholder={name+' *'} required />
    //             <datalist id="departements">
    //                 <option value="Bakel"></option>
    //                 <option value="Bambey"></option>
    //                 <option value="Bignona"></option>
    //                 <option value="Birkelane "></option>
    //                 <option value="Bounkiling"></option>
    //                 <option value="Dagana"></option>
    //                 <option value="Dakar"></option>
    //                 <option value="Diourbel"></option>
    //                 <option value="Fatick"></option>
    //                 <option value="Foundiougne"></option>
    //                 <option value="Gossas"></option>
    //                 <option value="Goudiry"></option>
    //                 <option value="Goudomp"></option>
    //                 <option value="Guédiawaye"></option>
    //                 <option value="Guinguinéo"></option>
    //                 <option value="Kaffrine"></option>
    //                 <option value="Kanel"></option>
    //                 <option value="Kaolack"></option>
    //                 <option value="Kébémer"></option>
    //                 <option value="Kédougou"></option>
    //                 <option value="Keur Massar"></option>
    //                 <option value="Kolda"></option>
    //                 <option value="Koumpentoum"></option>
    //                 <option value="Koungheul"></option>
    //                 <option value="Linguère"></option>
    //                 <option value="Louga"></option>
    //                 <option value="Mbour"></option>
    //                 <option value="Malem-Hodar"></option>
    //                 <option value="Matam"></option>
    //                 <option value="Mbacké"></option>
    //                 <option value="Médina Yoro Foulah"></option>
    //                 <option value="Nioro du Rip"></option>
    //                 <option value="Oussouye"></option>
    //                 <option value="Pikine"></option>
    //                 <option value="Podor"></option>
    //                 <option value="Ranérou"></option>
    //                 <option value="Rufisque"></option>
    //                 <option value="Saint-Louis"></option>
    //                 <option value="Salemata"></option>
    //                 <option value="Saraya"></option>
    //                 <option value="Sédhiou"></option>
    //                 <option value="Tambacounda"></option>
    //                 <option value="Thiès"></option>
    //                 <option value="Tivaouane"></option>
    //                 <option value="Vélingara"></option>
    //                 <option value="Ziguinchor"></option> 
    //             </datalist>
    //     </div>
    //     )} -->