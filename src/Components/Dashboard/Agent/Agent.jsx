import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { FaEdit, FaEye } from "react-icons/fa";

const Agent = () => {
  const [tickets, setTickets] = useState([]);
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tickets"));
        const ticketsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTickets(ticketsList);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    const fetchAgents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users")); // Assuming agents are stored in "users"
        const agentsList = querySnapshot.docs
          .map((doc) => doc.data())
          .filter((user) => user.role === "agent"); 
          // Filter only agents
        setAgents(agentsList);
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    };

    fetchTickets();
    fetchAgents();
  }, []);
  console.log(agents)


  // Function to update ticket status
  const handleStatusChange = async (ticketId, newStatus) => {
    try {
      const ticketRef = doc(db, "tickets", ticketId);
      await updateDoc(ticketRef, { status: newStatus });
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
        )
      );
    } catch (error) {
      console.error("Error updating ticket status:", error);
    }     axc
  };

  // Function to assign ticket to an agent
  const handleAssignTicket = async (ticketId, assignedTo) => {
    try {
      const ticketRef = doc(db, "tickets", ticketId);
      await updateDoc(ticketRef, { assignedTo });
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.id === ticketId ? { ...ticket, assignedTo } : ticket
        )
      );
    } catch (error) {
      console.error("Error assigning ticket:", error);
    }
  };

  return (
    <div className="lg:ml-[250px] shadow-xl p-6 flex justify-center flex-col ">
      <h2 className="text-2xl font-bold mb-4">Support Agent Dashboard</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Ticket ID</th>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Priority</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Assigned To</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="text-center">
                <td className="p-2 border">{ticket.id}</td>
                <td className="p-2 border">{ticket.title}</td>
                <td className="p-2 border">{ticket.description}</td>
                <td className="p-2 border">{ticket.priority}</td>
                <td className="p-2 border">
                  <select
                    value={ticket.status}
                    onChange={(e) => handleStatusChange(ticket.id, e.target.value)}
                    className="p-1 border rounded"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </td>
                <td className="p-2 border">
                  <select
                    value={ticket.assignedTo || ""}
                    onChange={(e) => handleAssignTicket(ticket.id, e.target.value)}
                    className="p-1 border rounded"
                  >
                    <option value="">Unassigned</option>
                    {agents.map((agent) => (
                      <option key={agent.email} value={agent.email}>
                        {agent.email}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-2 border flex py-[2rem]">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded cursor-pointer"
                    onClick={() => alert(`Viewing ticket: ${ticket.id}`)}
                  >
                    <FaEye/>
                  </button>
                  <button
                    className="bg-green-500 text-white px-2 py-1 ml-2 rounded cursor-pointer"
                    onClick={() => alert(`Editing ticket: ${ticket.id}`)}
                  >
                    <FaEdit/>
                  </button>
                  {/* No delete button for agents */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Agent;
