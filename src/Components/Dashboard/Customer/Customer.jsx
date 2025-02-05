import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import axios from "axios";
import { MdDelete } from "react-icons/md";
Modal.setAppElement("#root"); // For accessibility

function CustomerDashboard() {
       const { userData } = useSelector(st => st.auth);
       const [tickets, setTickets] = useState([]);
       const [modalOpen, setModalOpen] = useState(false);
       const [file, setfile] = useState("")
       const [newTicket, setNewTicket] = useState({
              title: "",
              description: "",
              priority: "Low",
              category: "General",
              contactEmail: "",
              contactPhone: "",
              issueDate: "",
              isUrgent: false,
              department: "",
              attachment: null,
              browser: "",
              operatingSystem: "",
              additionalNotes: "",
              attachmentURL: ""
       });
       console.log(tickets)
       const [uploading, setUploading] = useState(false);
       useEffect(() => {
              if (userData) fetchTickets();
       }, [userData]);

       async function fetchTickets() {
              if (!userData) return;
              const q = query(collection(db, "tickets"), where("createdBy", "==", userData.uid));
              const querySnapshot = await getDocs(q);
              setTickets(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
       }
       async function handleFileUpload(f) {
              if (!f) return;
              setUploading(true);
              setfile(f)

              const formData = new FormData();
              formData.append("file", f);
              formData.append("upload_preset", "my_preset"); // Replace with your actual preset
              formData.append("cloud_name", "dtwftajii");
              try {
                     const response = await axios.post(
                            "https://api.cloudinary.com/v1_1/dtwftajii/image/upload",
                            formData
                     );

                     setfile(response.data.secure_url);
                     alert("Upload successful!");

              } catch (error) {
                     console.error("Upload failed:", error);
              }
              finally {
                     setUploading(false)
              }
       }
       async function handleSubmit(e) {
              e.preventDefault();
              if (!newTicket.title || !newTicket.description || !newTicket.contactEmail) {
                     alert("Please fill in all required fields!");
                     return;
              }

              try {
                     await addDoc(collection(db, "tickets"), {
                            ...newTicket,
                            createdBy: userData.uid,
                            createdAt: new Date(),
                            status: "Open",
                            assignedTo: null,
                            attachmentURL:file
                     });
                     alert("Ticket submitted successfully!");
                     setModalOpen(false);
                     setNewTicket({
                            title: "",
                            description: "",
                            priority: "Low",
                            category: "General",
                            contactEmail: "",
                            contactPhone: "",
                            issueDate: "",
                            isUrgent: false,
                            department: "",
                            attachment: null,
                            attachmentURL: "",
                            browser: "",
                            operatingSystem: "",
                            additionalNotes: "",
                     });
                     fetchTickets();
              } catch (error) {
                     console.error("Error adding ticket:", error);
              }
       }

       async function handleDelete(ticketId) {
              if (window.confirm("Are you sure you want to delete this ticket?")) {
                     try {
                            await deleteDoc(doc(db, "tickets", ticketId));
                            fetchTickets();
                     } catch (error) {
                            console.error("Error deleting ticket:", error);
                     }
              }
       }

       return (
              <div className=" lg:ml-[300px] p-6 ">
                     <div className="flex flex-col justify-center items-center">
                            <h1 className="text-2xl font-bold mb-4">Tickets Page</h1>
                            <button onClick={() => setModalOpen(true)} className="bg-blue-500 text-white p-2 rounded mb-4 cursor-pointer">
                                   Raise New Ticket
                            </button>

                     </div>
                     {/* Ticket Submission Modal */}
                     <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} className="bg-white p-6 rounded  max-w-lg  mx-auto mt-10 overflow-y-auto max-h-[90vh] shadow-xl">
                            <div className="flex justify-between items-center">
                                   <h2 className="text-xl font-semibold ">Submit a New Ticket</h2>
                                   <button onClick={() => setModalOpen(false)} className="m-4 text-red-500 cursor-pointer">Close</button>

                            </div>
                            <form onSubmit={handleSubmit} className="space-y-3">

                                   <input type="text" placeholder="Title" required className="w-full p-2 border rounded" value={newTicket.title} onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })} />

                                   <textarea placeholder="Description" required className="w-full p-2 border rounded" value={newTicket.description} onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })} />

                                   <select className="w-full p-2 border rounded" value={newTicket.priority} onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}>

                                          <option value="Low">Low</option>
                                          <option value="Medium">Medium</option>
                                          <option value="High">High</option>

                                   </select>

                                   <select className="w-full p-2 border rounded" value={newTicket.category} onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}>

                                          <option value="General">General</option>
                                          <option value="Billing">Billing</option>
                                          <option value="Technical">Technical</option>
                                          <option value="Account">Account</option>

                                   </select>

                                   <input type="email" placeholder="Contact Email" required className="w-full p-2 border rounded" value={newTicket.contactEmail} onChange={(e) => setNewTicket({ ...newTicket, contactEmail: e.target.value })} />

                                   <input type="tel" placeholder="Contact Phone" className="w-full p-2 border rounded" value={newTicket.contactPhone} onChange={(e) => setNewTicket({ ...newTicket, contactPhone: e.target.value })} />

                                   <label className="block font-medium">Upload Attachment:</label>
                                   <input type="file" className="w-full p-2 border rounded" onChange={(e) => handleFileUpload(e.target.files[0])} />

                                   {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
                                   {/* {newTicket.attachmentURL && <p className="text-green-500">File Uploaded! ✅</p>} */}


                                   <input type="date" className="w-full p-2 border rounded" value={newTicket.issueDate} onChange={(e) => setNewTicket({ ...newTicket, issueDate: e.target.value })} />

                                   <label className="flex items-center">
                                          <input type="checkbox" className="mr-2" checked={newTicket.isUrgent} onChange={(e) => setNewTicket({ ...newTicket, isUrgent: e.target.checked })} />
                                          Mark as Urgent
                                   </label>


                                   <textarea placeholder="Additional Notes (Optional)" className="w-full p-2 border rounded" value={newTicket.additionalNotes} onChange={(e) => setNewTicket({ ...newTicket, additionalNotes: e.target.value })} />

                                   <button className="bg-green-500 text-white p-2 rounded w-full">Submit</button>

                            </form>
                     </Modal>

                     {/* Ticket List */}
                     <h2 className="text-lg font-semibold mb-3">My Tickets</h2>
                     <div className="overflow-x-auto max-w-[300vw] sm:max-w-full sm:shadow-xl p-6">
                            <table className="w-full border-collapse border border-gray-300 ">
                                   <thead>
                                          <tr className="bg-gray-200">
                                                 <th className="border p-2">Title</th>
                                                 <th className="border p-2">Category</th>
                                                 <th className="border p-2">Priority</th>
                                                 <th className="border p-2">Status</th>

                                                 <th className="border p-2">Attachments</th>
                                                 <th className="border p-2">Actions</th>
                                          </tr>
                                   </thead>
                                   <tbody>
                                          {tickets.map((ticket) => (
                                                 <tr key={ticket.id} className="border">
                                                        <td className="border p-2">{ticket.title}</td>
                                                        <td className="border p-2">{ticket.category}</td>
                                                        <td className="border p-2">{ticket.priority}</td>
                                                        <td className="border p-2">{ticket.status}</td>

                                                        <td className="border p-2">
                                                               {ticket.attachmentURL ? (
                                                                      <a href={ticket.attachmentURL} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View File</a>
                                                               ) : (
                                                                      "No Attachment"
                                                               )}
                                                        </td>
                                                        <td className="border p-2">
                                                               <button onClick={() => handleDelete(ticket.id)} className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer"> <MdDelete/> </button>
                                                        </td>
                                                 </tr>
                                          ))}
                                   </tbody>
                            </table>
                     </div>

              </div>
       );
}

export default CustomerDashboard;
