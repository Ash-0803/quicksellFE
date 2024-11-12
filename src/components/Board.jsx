import "./Board.css";
import { Icons } from "./Icons";
import TicketCard from "./TicketCard";

const Board = ({ tickets, users, grouping, sorting }) => {
  const getPriorityDetails = (priority) => {
    const priorityMap = {
      4: { label: "Urgent", icon: <Icons.Urgent /> },
      3: { label: "High", icon: <Icons.High /> },
      2: { label: "Medium", icon: <Icons.Medium /> },
      1: { label: "Low", icon: <Icons.Low /> },
      0: { label: "No priority", icon: <Icons.NoPriority /> },
    };
    return priorityMap[priority] || priorityMap[0];
  };

  const getStatusIcon = (status) => {
    const statusMap = {
      Todo: <Icons.Todo />,
      "In progress": <Icons.InProgress />,
      Backlog: <Icons.Backlog />,
      Done: <Icons.Done />,
      Canceled: <Icons.Canceled />,
      Urgent: <Icons.Urgent1 />,
      High: <Icons.High />,
      Medium: <Icons.Medium />,
      Low: <Icons.Low />,
      "No priority": <Icons.NoPriority />,
    };
    return statusMap[status] || null;
  };

  const groupTickets = () => {
    let grouped = {};

    if (grouping === "status") {
      grouped = {
        Backlog: [],
        Todo: [],
        "In progress": [],
        Done: [],
        Canceled: [],
      };
      tickets.forEach((ticket) => {
        grouped[ticket.status].push(ticket);
      });
    } else if (grouping === "user") {
      users.forEach((user) => {
        grouped[user.name] = [];
      });
      tickets.forEach((ticket) => {
        const user = users.find((u) => u.id === ticket.userId);
        if (user) {
          grouped[user.name].push(ticket);
        }
      });
    } else if (grouping === "priority") {
      grouped = {
        Urgent: [],
        High: [],
        Medium: [],
        Low: [],
        "No priority": [],
      };
      tickets.forEach((ticket) => {
        const { label } = getPriorityDetails(ticket.priority);
        grouped[label].push(ticket);
      });
    }

    // Sort tickets within each group
    Object.keys(grouped).forEach((key) => {
      grouped[key].sort((a, b) => {
        if (sorting === "priority") {
          return b.priority - a.priority;
        } else {
          return a.title.localeCompare(b.title);
        }
      });
    });

    return grouped;
  };

  const getGroupIcon = (group, grouping) => {
    if (grouping === "status") {
      return getStatusIcon(group);
    } else if (grouping === "priority") {
      return getStatusIcon(group);
    }
    return null;
  };

  const groupedTickets = groupTickets();

  return (
    <div className="board-container">
      {Object.entries(groupedTickets).map(([group, groupTickets]) => (
        <div key={group} className="column-section">
          <div className="column-header">
            <div className="group-details">
              {getGroupIcon(group, grouping)}
              <h3>{group}</h3>
              <span className="ticket-count">{groupTickets.length}</span>
            </div>
            <div className="column-controls">
              <button className="icon-btn">
                <Icons.Plus />
              </button>
              <button className="icon-btn">
                <Icons.Options />
              </button>
            </div>
          </div>
          <div className="ticket-container">
            {groupTickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                user={users.find((u) => u.id === ticket.userId)}
                priorityInfo={getPriorityDetails(ticket.priority)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Board;
