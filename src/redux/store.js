import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slice/authSlice';
import userSlice from './slice/userSlice';
import resumeSlice from './slice/resumeSlice.js';
import skillSliceJsCopy from './slice/skillSlice.js';
import serviceSlice from './slice/serviceSlice.js';
import projectSlice from './slice/projectSlice.js';
import contactusSlice from './slice/contactusSlice.js';
import experienceSlice from './slice/experience.js';

export const store = configureStore({
  reducer: {
    project: projectSlice,
    auth: authSlice,
    user: userSlice,
    resume: resumeSlice,
    skill: skillSliceJsCopy,
    service: serviceSlice,
    contactUs: contactusSlice,
    experience: experienceSlice,
  }
});