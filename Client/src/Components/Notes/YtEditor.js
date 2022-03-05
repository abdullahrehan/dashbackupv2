// import React, { useState ,useEffect,useContext,useRef,memo } from 'react';
// import { Editor } from 'react-draft-wysiwyg';
// import { EditorState,Modifier,getDefaultKeyBinding ,KeyBindingUtil,ContentState,RichUtils,convertFromRaw,readOnly } from 'draft-js';
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import Context from '../HooksFiles/Context'
// import NotesContext from './NotesContext/NotesContext'
// import axios from 'axios'
// // import Editor from '@draft-js-plugins/editor';

// import createImagePlugin from '@draft-js-plugins/image';
// import './editor.css'

// const initialstate= EditorState.createEmpty()

//   const Editors = ({emptyEditor,NotesData,setNotesData}) => {

//     const [file,setfile]=useState('')
//     const state={notes:"as",currentFolder:"as",editNotes:"as"}
//     // const {notesState,notesDispatch}=useContext(NotesContext)
//     // const {editIconColor,YtNotes}=notesState
//     // const [NotesData,setNotesData]=useState(initialstate);
//     const editorRef=useRef()

//     const previewNotes=state.notes!==null?true:false
//     const imagePlugin = createImagePlugin();

//     function uploadImageCallBack(file) {
 
//          return new Promise(
//             (resolve, reject) => {
               
//       const form=new FormData();
//       const folder=state.currentFolder
//       form.append('image', file);
//       form.append('folder', folder);
//               console.log(folder)
//       axios.post("/notesImages",form)
 

//           }
//         );
//       }
//     function insertCharacter(characterToInsert, editorState) {
//       const currentContent = editorState.getCurrentContent(),
//             currentSelection = editorState.getSelection();
    
//       const newContent = Modifier.replaceText(
//         currentContent,
//         currentSelection,
//         characterToInsert
//       );
    
//       const newEditorState = EditorState.push(editorState, newContent, 'insert-characters');
    
//       return  newEditorState;
//     }
//     const removeSelectedBlocksStyle = (editorState)  => {
//       const newContentState = RichUtils.tryToRemoveBlockStyle(editorState);
//       if (newContentState) {
//           return EditorState.push(editorState, newContentState, 'change-block-type');
//       }
//       return editorState;
//   }
   
//    const getResetEditorState = (editorState) => {
//       const blocks = editorState
//           .getCurrentContent()
//           .getBlockMap()
//           .toList();
//       const updatedSelection = editorState.getSelection().merge({
//           anchorKey: blocks.first().get('key'),
//           anchorOffset: 0,
//           focusKey: blocks.last().get('key'),
//           focusOffset: blocks.last().getLength(),
//       });
//       const newContentState = Modifier.removeRange(
//           editorState.getCurrentContent(),
//           updatedSelection,
//           'forward'
//       );
  
//       const newState = EditorState.push(editorState, newContentState, 'update-state');
//       return removeSelectedBlocksStyle(newState)
//   }

// const g=()=>{
//   const da=getResetEditorState(NotesData)
//   setNotesData(da)         
//   setNotesData(initialstate) 
// }

// const a=()=>{
  
   
  
// //     const data2=EditorState.createWithContent(convertFromRaw(JSON.parse(
// //       '{"blocks":[{"key":"40ig","text":"JavaScript Promises ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":20,"style":"fontsize-24"},{"offset":0,"length":20,"style":"BOLD"},{"offset":0,"length":20,"style":"color-rgb(97,189,109)"}],"entityRanges":[],"data":{}},{"key":"5pau0","text":"A promise is an object that allows you to handle asynchronous operations. It’s an alternative to plain old callbacks.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":2,"length":8,"style":"color-rgb(26,188,156)"}],"entityRanges":[],"data":{}},{"key":"a9ho7","text":" Promises have many advantages over callbacks. To name a few:","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"3b29l","text":" Make the async code easier to read.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8t11u","text":" Provide combined error handling.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"2e9qr","text":" Better control flow. You can have async actions execute in parallel or series.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"3gia1","text":" Callbacks tend to form deeply nested structures (a.k.a. Callback hell). Like the following:","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":72,"length":20,"style":"color-rgb(26,188,156)"}],"entityRanges":[],"data":{}},{"key":"5lfpl","text":"  a(() => { ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":12,"style":"color-rgb(235,107,86)"}],"entityRanges":[],"data":{}},{"key":"bktn7","text":"       b(() => { ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":17,"style":"color-rgb(235,107,86)"}],"entityRanges":[],"data":{}},{"key":"448v","text":"             c(() => { ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":23,"style":"color-rgb(235,107,86)"}],"entityRanges":[],"data":{}},{"key":"5uek9","text":"                    d(() => { // and so on ... });","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":50,"style":"color-rgb(235,107,86)"}],"entityRanges":[],"data":{}},{"key":"baegr","text":"              });","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":17,"style":"color-rgb(235,107,86)"}],"entityRanges":[],"data":{}},{"key":"d4ov6","text":"        });","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":11,"style":"color-rgb(235,107,86)"}],"entityRanges":[],"data":{}},{"key":"4o4u","text":" });","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":4,"style":"color-rgb(235,107,86)"}],"entityRanges":[],"data":{}},{"key":"cqa3s","text":" If you convert those functions to promises, they can be chained producing more maintainable code. Something like this: ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"66r1f","text":"Promise.resolve() .","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":19,"style":"color-rgb(251,160,38)"}],"entityRanges":[],"data":{}},{"key":"30fah","text":"then(a) ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":8,"style":"color-rgb(251,160,38)"}],"entityRanges":[],"data":{}},{"key":"tk3i","text":".then(b) ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":9,"style":"color-rgb(251,160,38)"}],"entityRanges":[],"data":{}},{"key":"a2ngl","text":".then(c) ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":9,"style":"color-rgb(251,160,38)"}],"entityRanges":[],"data":{}},{"key":"eil2i","text":".then(d) ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":9,"style":"color-rgb(251,160,38)"}],"entityRanges":[],"data":{}},{"key":"4spf2","text":".catch(console.error);","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":22,"style":"color-rgb(251,160,38)"}],"entityRanges":[],"data":{}},{"key":"9pmri","text":" As you can see, in the example above, the promise object exposes the methods .then and .catch. We are going to explore these methods later.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}')))
// //     console.log(state.notes.body);

// //     console.log(data2);
 
// //  const data=insertCharacter(data2, NotesData)
 
// //   setNotesData(data2) 
 
// //   console.log(NotesData)
// }

// const c=()=>{
// //   console.log(YtNotes.body);
  
// // const as=EditorState.createWithContent(convertFromRaw(JSON.parse("<p>Hello</p>")))
// // console.log(as);
// // setNotesData(as) 
// }
// // useEffect(() => { 
// //   if(emptyEditor){
// //     g()
// //   }

// // }, [emptyEditor])

// //     useEffect(() => { 
// //       if(state.notes!==null){
      
// //         a()
// //       }

// //     }, [state.notes])
   

// //     useEffect(() => { 
// //      if(YtNotes!==null && YtNotes!==undefined){
// //       console.log(YtNotes);      
// //         c()
// //       }
      
// //     }, [YtNotes])
    
//     const styleMap = {
//       'STRIKETHROUGH': {
//         width: '53%',
//         left: '6%',
//       },
       
//     };
//     console.log(document.getElementsByClassName('rdw-editor-main'));
//   if(document.getElementsByClassName('rdw-editor-toolbar')[0]!==undefined){
//   document.getElementsByClassName('rdw-editor-main')[0].style.width="100%"
//   document.getElementsByClassName('rdw-editor-toolbar')[0].style.display="none"
//   document.getElementsByClassName('rdw-editor-main')[0].style.left="20%"
//   document.getElementsByClassName('rdw-editor-main')[0].style.color="red"
//   // document.getElementsByClassName('rdw-editor-main')[0].style.backgroundColor="black"
//   document.getElementsByClassName('rdw-editor-main')[0].style.height="99%"
//   document.getElementsByClassName('rdw-editor-main')[0].style.top="0%"
//   document.getElementsByClassName('rdw-editor-main')[0].style.border="none"
//   document.getElementsByClassName('rdw-editor-main')[0].style.transitionDuration=".5s"
//   document.getElementsByClassName('DraftEditor-root')[0].style.paddingTop="2%"
//   document.getElementsByClassName('DraftEditor-root')[0].style.cursor="pointer"
  
// }
// else if(!previewNotes && document.getElementsByClassName('rdw-editor-main')[0]!==undefined){
//   document.getElementsByClassName('rdw-editor-main')[0].style.width="40%"
//   document.getElementsByClassName('rdw-editor-main')[0].style.left="1%"
//   document.getElementsByClassName('rdw-editor-main')[0].style.height="71%"
//   document.getElementsByClassName('rdw-editor-main')[0].style.top="18%"
//   document.getElementsByClassName('DraftEditor-root')[0].style.paddingTop="0%"
 
// }
//     return (
//     <>
//     <Editor
//     plugins={[imagePlugin]}
//       editorState={NotesData}
//       wrapperClassName="demo-wrapper"
//       editorClassName="demo-editor"
//       toolbar={{
//         inline: { inDropdown: true },
//         list: { inDropdown: true },
//         textAlign: { inDropdown: true },
//         link: { inDropdown: true },
//         history: { inDropdown: true },
//         image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
//       }}
//       onEditorStateChange={setNotesData}
//       readOnly={state.notes!==null ? state.editNotes : false}
//       ref={editorRef}
//       customStyleMap={styleMap}

// /> 
//     </>
//   )
// }

  
// export default memo(Editors)
 
import React, { useState ,useEffect,useContext,useRef,memo } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState,Modifier,getDefaultKeyBinding ,KeyBindingUtil,ContentState,RichUtils,convertFromRaw,readOnly } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Context from '../HooksFiles/Context'
import NotesContext from '../Notes/NotesContext/NotesContext'
import axios from 'axios'
// import Editor from '@draft-js-plugins/editor';

import createImagePlugin from '@draft-js-plugins/image';
// import './editor.css'

const initialstate= EditorState.createEmpty()

  const Editors = ({emptyEditor,NotesData,setNotesData}) => {

    const [file,setfile]=useState('')
    const {state,dispatch}=useContext(Context)
    const {notesState,notesDispatch}=useContext(NotesContext)
    const {editIconColor,YtNotes}=notesState

    // const [NotesData,setNotesData]=useState(initialstate);
    const editorRef=useRef()

    const previewNotes=state.notes!==null?true:false
    const imagePlugin = createImagePlugin();

    function uploadImageCallBack(file) {
 
         return new Promise(
            (resolve, reject) => {
               
      const form=new FormData();
      const folder=state.currentFolder
      form.append('image', file);
      form.append('folder', folder);
              console.log(folder)
      axios.post("/notesImages",form)
 

          }
        );
      }
    function insertCharacter(characterToInsert, editorState) {
      const currentContent = editorState.getCurrentContent(),
            currentSelection = editorState.getSelection();
    
      const newContent = Modifier.replaceText(
        currentContent,
        currentSelection,
        characterToInsert
      );
    
      const newEditorState = EditorState.push(editorState, newContent, 'insert-characters');
    
      return  newEditorState;
    }
    const removeSelectedBlocksStyle = (editorState)  => {
      const newContentState = RichUtils.tryToRemoveBlockStyle(editorState);
      if (newContentState) {
          return EditorState.push(editorState, newContentState, 'change-block-type');
      }
      return editorState;
  }
   
   const getResetEditorState = (editorState) => {
      const blocks = editorState
          .getCurrentContent()
          .getBlockMap()
          .toList();
      const updatedSelection = editorState.getSelection().merge({
          anchorKey: blocks.first().get('key'),
          anchorOffset: 0,
          focusKey: blocks.last().get('key'),
          focusOffset: blocks.last().getLength(),
      });
      const newContentState = Modifier.removeRange(
          editorState.getCurrentContent(),
          updatedSelection,
          'forward'
      );
  
      const newState = EditorState.push(editorState, newContentState, 'update-state');
      return removeSelectedBlocksStyle(newState)
  }

const g=()=>{
  const da=getResetEditorState(NotesData)
  setNotesData(da)         
  setNotesData(initialstate) 
}

const a=()=>{
  
   
  
    const data2=EditorState.createWithContent(convertFromRaw(JSON.parse(state.notes.body)))
    console.log(state.notes.body);

    console.log(data2);
 
 const data=insertCharacter(data2, NotesData)
 
  setNotesData(data2) 
 
  console.log(NotesData)
}

const c=()=>{
  console.log(YtNotes.body);
  
const as=EditorState.createWithContent(convertFromRaw(JSON.parse(<p>Hello</p>)))
console.log(as);
setNotesData(as) 
}
useEffect(() => { 
  if(emptyEditor){
    g()
  }

}, [emptyEditor])

    useEffect(() => { 
      if(state.notes!==null){
      
        a()
      }

    }, [state.notes])
   

    useEffect(() => { 
     if(YtNotes!==null && YtNotes!==undefined){
      console.log(YtNotes);      
        c()
      }
      
    }, [YtNotes])
    
    const styleMap = {
      'STRIKETHROUGH': {
        width: '53%',
        left: '6%',
      },
    };
    if(document.getElementsByClassName('rdw-editor-main')[0]!==undefined){
  document.getElementsByClassName('rdw-editor-main')[0].style.width="100%"
    // document.getElementsByClassName('rdw-editor-toolbar')[0].style.display="none"
  document.getElementsByClassName('rdw-editor-main')[0].style.left="0%"
  document.getElementsByClassName('rdw-editor-main')[0].style.height="99%"
  document.getElementsByClassName('rdw-editor-main')[0].style.top="0%"
  document.getElementsByClassName('rdw-editor-main')[0].style.border="none"
  document.getElementsByClassName('rdw-editor-main')[0].style.borderRadius="5px"
  document.getElementsByClassName('DraftEditor-root')[0].style.paddingTop="2%"
  document.getElementsByClassName('DraftEditor-root')[0].style.cursor="pointer"
  
}
else if(!previewNotes && document.getElementsByClassName('rdw-editor-main')[0]!==undefined){
  document.getElementsByClassName('rdw-editor-main')[0].style.width="40%"
  document.getElementsByClassName('rdw-editor-main')[0].style.left="1%"
  document.getElementsByClassName('rdw-editor-main')[0].style.height="71%"
  document.getElementsByClassName('rdw-editor-main')[0].style.top="18%"
  document.getElementsByClassName('DraftEditor-root')[0].style.paddingTop="0%"
 
}
useEffect(() => {
  document.getElementsByClassName('rdw-editor-toolbar')[0].style.display="none"
  document.getElementsByClassName('rdw-editor-main')[0].style.display="none"
  
}, [])
    return (
    <>
    <Editor
    plugins={[imagePlugin]}
      editorState={NotesData}
      wrapperClassName="demo-wrapper"
      editorClassName="demo-editor"
      toolbar={{
        inline: { inDropdown: true },
        list: { inDropdown: true },
        textAlign: { inDropdown: true },
        link: { inDropdown: true },
        history: { inDropdown: true },
        image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
      }}
      onEditorStateChange={setNotesData}
      readOnly={state.notes!==null ? state.editNotes : false}
      ref={editorRef}
      customStyleMap={styleMap}

/> 
    </>
  )
}

  
export default memo(Editors)
 