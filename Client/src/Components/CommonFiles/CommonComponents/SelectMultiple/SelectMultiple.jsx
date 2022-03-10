import React, { useContext } from 'react'
import { MdSelectAll } from 'react-icons/md';
import { BiSend } from 'react-icons/bi';
import { FiSettings } from 'react-icons/fi';
import { AiTwotoneDelete } from 'react-icons/ai'
import Context from '../../../HooksFiles/Context'
import NotesFunc from '../../../Notes/NotesFunc/NotesFunc'
import CommonFunctions from '../../CommonFunction/CommonFunctions'
import './SelectMultiple.css'

function SelectMultiple({ showYoutube }) {

    const { ExpandMultipleFiles, displayDeleteFileDiv, selectAllFunc } = NotesFunc()
    const { selectMultipleFunc } = CommonFunctions()
    const { state, dispatch } = useContext(Context)
    const { selectMultiple } = state


    return (


        <div id="sideIcons_MainDiv" style={{ display: showYoutube ? "none" : "flex" }}>

            <div id="selectAll_button_mainDiv" style={{ borderLeft: selectMultiple ? null : 'none', borderBottom: selectMultiple ? null : 'none' }}>

                <FiSettings size={35} id="mutiSelect_selectAll_button" onClick={selectMultipleFunc} />

            </div>

            <div id="sideIcons_IconsDiv" style={{ opacity: selectMultiple ? 100 : 0 }}>

                <button id="mutiSelect_send_button" onClick={() => ExpandMultipleFiles('send')} >
                    <BiSend size={35} />
                </button>

                <AiTwotoneDelete id="mutiSelect_delete_button" size={35} onClick={displayDeleteFileDiv} />

                <input type="checkbox" size={37} id='checkbox_Icon_Main' onClick={selectAllFunc} />

            </div>
        </div>
    )
}

export default SelectMultiple
