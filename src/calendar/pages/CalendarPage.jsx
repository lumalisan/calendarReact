import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { addHours } from 'date-fns'
import { Navbar } from '../components/Navbar'
import { getMessagesES, localizer } from '../../helpers'

const myEventsList = [{
    title: 'Cumpleaños de la jefa',
    notes: 'Hay que comer rico rico',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
        id: '123',
        name: 'Pepe'
    }
}]

export const CalendarPage = () => {

    const eventStyleGetter = (event, start, end, isSelected) => {
        
    }

    return (
        <>
            <Navbar />

            <Calendar
                culture='es'
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px)' }}
                messages={ getMessagesES() }
                eventPropGetter={ eventStyleGetter }
            />
        </>
    )
}