import {
  AiOutlineClear,
  AiOutlineCloudUpload
} from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import { BsCollection } from 'react-icons/bs';
import { GoTriangleDown } from 'react-icons/go';
import { GrUndo } from 'react-icons/gr';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import {
  IoAddSharp,
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoInfiniteOutline,
  IoSaveOutline
} from 'react-icons/io5';
import {
  MdDone,
  MdOutlineModeEditOutline,
  MdOutlineNextPlan
} from 'react-icons/md';
import { RiLoader2Fill } from 'react-icons/ri';
import { VscPreview } from 'react-icons/vsc';
import { Icon } from '../interfaces';

const icon: Icon = {
  add: (
    <IoAddSharp className="icon add-scrap-button" />
  ),
  cloudUpload: (
    <AiOutlineCloudUpload className="icon" />
  ),
  collections: (
    <BsCollection className="icon" />
  ),
  preview: (
    <VscPreview className="icon" />
  ),
  undo: (
    <GrUndo className="icon undo-button" />
  ),
  exit: (
    <IoAddSharp className="icon exit-scrap-button" />
  ),
  done: (
    <MdDone className="icon done-scrap-button" />
  ),
  edit: (
    <MdOutlineModeEditOutline className="icon edit-scrap-button" />
  ),
  save: (
    <IoSaveOutline className="icon save-scrap-button" />
  ),
  close: (
    <IoIosCloseCircleOutline className="icon close-scraper-button" />
  ),
  clear: (
    <AiOutlineClear className="icon clear-scraper-button" />
  ),
  back: (
    <BiArrowBack className="icon back-button" />
  ),
  triangle: (
    <GoTriangleDown className="icon triangle-button" />
  ),
  next: (
    <MdOutlineNextPlan className="icon pagination-button" />
  ),
  infinite: (
    <IoInfiniteOutline className="icon infinite-scraper-button" />
  ),
  backOutline: <IoChevronBackOutline />,
  forwardOutline: (
    <IoChevronForwardOutline />
  ),
  loading: <RiLoader2Fill />
};

export default icon;
