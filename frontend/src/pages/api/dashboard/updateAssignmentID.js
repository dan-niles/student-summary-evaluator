export default async (req, res) => {
    if (req.method === 'POST') {
      const { assignmentID } = req.body;
      // Store the assignmentID in a session or database on the server for future use.
      // This can be done using a server-side state management approach or a database update.
      // Here, we'll simulate storing it in a session.
      req.session.assignmentID = assignmentID;
      return res.status(200).json({ message: 'Assignment ID updated.' });
    } else {
      return res.status(405).end();
    }
  };