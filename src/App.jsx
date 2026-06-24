import { useState, useRef } from 'react';
import './App.css';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CommentsPanel from './components/CommentsPanel';
import { Toast, useToast } from './components/Toast';

import RosterView      from './views/RosterView';
import TasksView       from './views/TasksView';
import CommView        from './views/CommView';
import SuppliersView   from './views/SuppliersView';
import OrdersView      from './views/OrdersView';
import EmailsView      from './views/EmailsView';
import FinanceView     from './views/FinanceView';
import PerformanceView from './views/PerformanceView';
import IncidentsView   from './views/IncidentsView';
import ChecklistView      from './views/ChecklistView';
import AvailabilityView   from './views/AvailabilityView';

import {
  initialRoster, initialTasks, initialEmails,
  initialIncidents, initialChecklist, initialComments,
} from './data/initialData';

export default function App() {
  const [tab, setTab]             = useState('roster');
  const [roster]                  = useState(initialRoster);
  const [tasks, setTasks]         = useState(initialTasks);
  const [emails, setEmails]       = useState(initialEmails);
  const [incidents, setIncidents] = useState(initialIncidents);
  const [checklist, setChecklist] = useState(initialChecklist);
  const [comments, setComments]   = useState(initialComments);
  const { msg, flash }            = useToast();
  const mainRef                   = useRef(null);

  function addComment(c) {
    setComments(prev => [c, ...prev]);
  }

  function navigate(t) {
    setTab(t);
    if (mainRef.current) mainRef.current.scrollTop = 0;
  }

  const viewProps = { flash, onNavigate: navigate };

  const views = {
    roster:      <RosterView      roster={roster}                                     {...viewProps} />,
    tasks:       <TasksView       tasks={tasks}       setTasks={setTasks}             {...viewProps} />,
    comm:        <CommView                                                              {...viewProps} />,
    suppliers:   <SuppliersView                                                        {...viewProps} />,
    orders:      <OrdersView                                                           {...viewProps} />,
    emails:      <EmailsView      emails={emails}     setEmails={setEmails}           {...viewProps} />,
    finance:     <FinanceView                                                          {...viewProps} />,
    performance: <PerformanceView                                                      {...viewProps} />,
    incidents:   <IncidentsView   incidents={incidents} setIncidents={setIncidents}   {...viewProps} />,
    checklist:    <ChecklistView    checklist={checklist} setChecklist={setChecklist}   {...viewProps} />,
    availability: <AvailabilityView                                                      {...viewProps} />,
  };

  return (
    <>
      <Header />
      <div className="app-body">
        <Sidebar current={tab} onNavigate={navigate} />
        <main className="main" ref={mainRef}>{views[tab]}</main>
        <CommentsPanel comments={comments} onAdd={addComment} />
      </div>
      <Toast msg={msg} />
    </>
  );
}
