import { useRef } from "react"
import Input from "./Input"
import Modal from "./Modal";

export default function NewProject({ onAdd, onCancel }) {

    const title = useRef();
    const description = useRef();
    const dueDate = useRef();
    const modal = useRef();

    function handleSave() {
        const enteredTitle = title.current.value;
        const enteredDescription = description.current.value;
        const enteredDueDate = dueDate.current.value;

        if (enteredDescription.trim() === '' || enteredTitle.trim() === '' || enteredDueDate.trim() === '') {
            modal.current.open();
            return;
        }

        onAdd({
            title: enteredTitle,
            description: enteredDescription,
            dueDate: enteredDueDate,
        })
    }

    return <>
        <Modal buttonCaption='Close' ref={modal}> 
        <h2 className='text-xl font-bold text-stone-700 my-4'>Invalid Input</h2>
        <p className='text-stone-600 mb-4'>You forgot to enter a value</p>
        <p className='text-stone-600 mb-4'>Please make sure you rpovide valid value for every input field. </p>
        </Modal>
        <div className="w-[35rem] mt-16">
            <menu className="flex items-center justify-end gap-4 my-4">
                <li>
                    <button onClick={onCancel} className="text-stone-800 hover:text-stone-950">Cancel</button>
                </li>
                <li>
                    <button onClick={handleSave} className="bg-stone-800 text-stone-50 hover:bg-stone-950 px-6 py-2 rounded-md">Save</button>
                </li>
            </menu>
            <div>
                <Input type='text' ref={title} label='Title' />
                <Input ref={description} label='Description' textArea />
                <Input type='date' ref={dueDate} label='Due Date' />
            </div>
        </div>
    </>
}