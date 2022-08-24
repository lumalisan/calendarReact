import { createSlice } from '@reduxjs/toolkit';
// import { addHours } from 'date-fns';

// const tempEvent = {
//     _id: new Date().getTime(),
//     title: 'Evento importante',
//     notes: 'Realizar preparativos del evento',
//     start: new Date(),
//     end: addHours(new Date(), 2),
//     bgColor: '#fafafa',
//     user: {
//         _id: '123',
//         name: 'Lisandro'
//     }
// };

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoadingEvents: true,
        events: [
            //tempEvent
        ],
        activeEvent: null
    },
    reducers: {
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: (state, { payload }) => {
            state.events.push(payload);
            state.activeEvent = null;
        },
        onUpdateEvent: (state, { payload }) => {
            state.events = state.events.map(event => {
                if (event.id === payload.id) {
                    return payload;
                }

                return event;
            });
        },
        onDeleteEvent: (state) => {
            if (state.activeEvent) {
                state.events = state.events.filter(event => event.id !== state.activeEvent.id);
                state.activeEvent = null;
            }
        },
        onLoadEvents: (state, { payload = [] }) => {
            state.isLoadingEvents = false;
            payload.forEach(event => {
                const exist = state.events.some(e => e.id === event.id);
                if (!exist) {
                    state.events.push(event);
                }
            });
        }
    }
});

// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents } = calendarSlice.actions;