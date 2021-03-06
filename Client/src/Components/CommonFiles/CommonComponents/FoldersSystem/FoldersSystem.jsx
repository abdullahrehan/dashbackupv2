import React, { useState,useContext,useRef,useCallback,memo } from 'react'
import {IoIosArrowBack} from 'react-icons/io'; 
import {IoIosArrowForward} from 'react-icons/io'; 
import { BsShieldLock } from 'react-icons/bs';  
import { FcOpenedFolder } from 'react-icons/fc';  
import Folder from './Images/folderIcon2.png'
import deleteIcon from './Images/folderDeleteIcon.png'
import deleteIcon2 from './Images/folderDeleteIcon2.png'
import FolderAddIcon from './Images/folder-add-icon.png'
import Securepopups from '../../../AsideDataFiles/Securepopup'
import FoldersSystemFunc from './FoldersSystemFunc'
import Context from '../../../HooksFiles/Context'
import SmallPopups from '../Popups/SmallPopUp/SmallPopups'
import SecurePopUp from '../Popups/SecurePopUp/PasswordSecurity'
import './FoldersSystem.css'

function FoldersSystem({EffectOn,setEffectOn,setImagesDataApi,openFolder}) {

//----------------------------------------------------------------Assigning States-------------------------------------------------------------

    const {state,dispatch}=useContext(Context) 
    const [writefoldername,setwritefoldername]=useState(false)
    const [deleteSecureFolderPassword,setdeleteSecureFolderPassword]=useState(false)
    const [currentFolder,setcurrentFolder]=useState('MainFolder')
    const [decreaseFolderDiv,setdecreaseFolderDiv]=useState(0)
    const [dragedFoldertoDelete,setdragedFoldertoDelete]=useState()
    const [enterFolderPassword,setenterFolderPassword]=useState(false)
    const [folderDeleteIcon,setfolderDeleteIcon]=useState(deleteIcon)
    const [folderNameInputRef,setfolderNameInputRef]=useState()
    const foldersDiv=state.showFoldersDiv
    const folderName=state.folders
    const mappingData=folderName
   
//------------------------------------------------------------Assigning Refs()--------------------------------------------------------------

    const folderDiv=useRef()
    const folders_main_div=useRef()
    const arrow_to_increase_folder_div_area=useRef()
    const arrow_to_decrease_folder_div_area=useRef()
    const create_new_folder=useRef()
    const folder_text=useRef()
    const folder_delete_icon=useRef()
    const deleteFolderText=useRef()
    const foldersCloseBtn=useRef()
    const folderImg=useRef()
    const folder_System_Main_Div=useRef()
    const create_folder_icon=useRef()

    const references={
        folderDiv,
        folders_main_div,
        arrow_to_increase_folder_div_area,
        arrow_to_decrease_folder_div_area,
        create_new_folder,
        folder_text,
        folder_delete_icon,
        deleteFolderText,
        foldersCloseBtn,
        folderImg,
        folder_System_Main_Div,
        create_folder_icon,}

    const {

        Drop_FolderDelete_icon,
        expandDiv,
        createNewFolder,
        shrinkDivfunc,
        closeFolderFun,
        setenterFolderPasswordsValue,
        setfoldernamepopup,
        decreaseButton,
        openfolder
    
    }=FoldersSystemFunc(decreaseFolderDiv,folderNameInputRef,references)
 


//----------------------------------------------------------Html Section of Page-------------------------------------------------------------------
     
    return (
        <>
       
       <FcOpenedFolder size={45} id='open_folder_icon' style={{display:foldersDiv?'none':'block'}} onClick={openFolder}/>
        <div id="folder_System_Main_Div" ref={folder_System_Main_Div} style={{zIndex:0}} >
           
       
            {/* ---------------arrow to increase folder div Icon---------------  */}
           
            <div id='arrow_to_increase_folder_div' style={{display:foldersDiv?'block':'none'}} ref={arrow_to_increase_folder_div_area} onClick={expandDiv}>
                <IoIosArrowBack size={40}/>
            </div>
            
            {/* --------------------- Folders Main Div -------------------------  */}

            <div id='Folders_Name_Main_Div' style={{width:foldersDiv ? "9.2%" : "0%",height:"84%",overflowX:foldersDiv ?"visible":"hidden"}} ref={folderDiv}>


            {/* ---------------arrow to decrease folder div Icon---------------  */}

                <div id='arrow_to_decrease_folder_div_area' ref={arrow_to_decrease_folder_div_area} onClick={ ()=>decreaseButton(shrinkDivfunc,decreaseFolderDiv,setdecreaseFolderDiv) }>
                    <IoIosArrowForward size={40}/>
                </div>
                
            {/* -------------------- Create New Folder Icon --------------------  */}

                <div id='create_new_folder' ref={create_new_folder}  >
                    <div className="folder-close-div" style={{display:foldersDiv?"block":expandDiv?"none":"block"}} ref={foldersCloseBtn} onClick={()=>closeFolderFun(folder_System_Main_Div,openFolder)}><FcOpenedFolder className="folder-close-icon"/></div>
                    
                    <img src={FolderAddIcon} className="create_folder_icon" ref={create_folder_icon} onClick={()=>setwritefoldername(true)}/>
                    <span id="folder_names_heading_text" ref={folder_text}>Folders</span>
                    <span id="folders_Delete_Icon" onDragOver={(e)=>{e.preventDefault()}} onDrop={()=>Drop_FolderDelete_icon(folder_delete_icon,dragedFoldertoDelete,setdeleteSecureFolderPassword)} ref={folder_delete_icon}>
                    <img src={folderDeleteIcon} className="folder-delete-Icon" onDragOver={()=>setfolderDeleteIcon(deleteIcon2)} onDragLeave={()=>setfolderDeleteIcon(deleteIcon)}/>
                    </span>
                    
                </div>

            {/* ------------------ Folders Name Mapping Div -----------------  */}

                <div id='folders_main_div' ref={folders_main_div} >

                    {mappingData!==undefined ? mappingData.map((folder_datass,index)=> 

            //  --------------------- Folders Name Images ---------------------  

                        <figure key={index} id='folder_image_figure' style={{backgroundColor:state.currentFolder===folder_datass.name?'#212529':null,marginLeft:"2.5%"}}  onClick={()=>openfolder(folder_datass,EffectOn,setEffectOn,setImagesDataApi,setenterFolderPassword,setcurrentFolder)}  >

            {/* --------------------- Folders Images Section ----------------   */}

                            <div>
                          
                                <div id="folder_image_div"  ref={folderImg} onDragStart={()=>{setdragedFoldertoDelete(folder_datass)}}>
                                    <img key={index+1} src={Folder} id='folders_icon_images' alt={'error'}/>
                                    <BsShieldLock id="folders_secure_icon" size={30} style={{display:folder_datass.secure===true ? 'block' : 'none'}}/>  
                                </div>

                                
                            </div>

            {/* --------------------------- Folders Images Caption -------------------------   */}

                            <figcaption key={index+2} id="folders_icon_images_name">
                                {folder_datass.name}
                            </figcaption>
                        
                        </figure>  
                    ):null}  

                
            {/* -------------------------- Delete Folder Instructions -----------------------   */}  
                
                    <span id="delete_Folder_Instructions" ref={deleteFolderText}>
                        To delete a Folder Drag and Drop it To the Bin.
                    </span>
                
                </div>
               

            </div> 
         
        </div>


        {/* --------------------- Popup for New Folder and Passing Values ------------------   */}  

        {enterFolderPassword || writefoldername?

        <SmallPopups 
        headingOne={"Create a New  Folder !"}
        headingTwo={"Please enter a name for  folder"}
        buttonHeading={"Create Folder"}
        mainDivDisplay={writefoldername} 
        crossFunction={()=>setwritefoldername(false)}
        buttonFunction={()=>createNewFolder(folderNameInputRef,setwritefoldername)}
        setFolderNameRef={value=>setfolderNameInputRef(value)}
        showInput={true}
        PaddingTop="8%"
        />


        :null}

        {/* --------------------- Popup for New Folder and Passing Values ------------------   */}  
        
        {deleteSecureFolderPassword?
            
            // <Securepopups 
            // deleteSecureFolderPassword={deleteSecureFolderPassword}
            // crossFunctiondeleteFolder={value=>setdeleteSecureFolderPassword(value)}
            // dragedFoldertoDelete={dragedFoldertoDelete}
            // EffectOn={EffectOn} 
            // setEffectOn={(value)=>setEffectOn(value)}
            // />

<SecurePopUp            
headingOne={"Delete Secure folder !"}
headingTwo={"Enter Folder password to Delete it"}
buttonHeading={"Delete Password"}
showEnterPassword={deleteSecureFolderPassword}
crossFunction={value=>setdeleteSecureFolderPassword(value)}
confirmFolderPassword={deleteSecureFolder}
folderPassword={folderPassword}
enterFolderPassword={value=>setfolderPassword(value)}
/>
:null}

</>
)}

export default memo(FoldersSystem)


