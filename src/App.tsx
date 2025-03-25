import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Container, Paper, CircularProgress } from "@mui/material";
import axios from "axios";

// Define email type
type Email = {
  from: string;
  subject: string;
  routed_to: string;
};

// API Service
const fetchEmails = async (): Promise<Email[]> => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/classify-emails");
    return response.data.emails;
  } catch (error) {
    console.error("Error fetching emails:", error);
    return [];
  }
};

const App: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmails().then((data) => {
      setEmails(data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Email Classifier
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Welcome to the Email Classifier
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          This app categorizes incoming emails and routes them to the correct department.
        </Typography>

        <Typography variant="h5" sx={{ mb: 2 }}>
          Classified Emails
        </Typography>
        
        {loading ? (
          <CircularProgress />
        ) : emails.length > 0 ? (
          emails.map((email, index) => (
            <Paper key={index} sx={{ p: 2, mb: 2, textAlign: "left" }}>
              <Typography variant="h6">{email.subject}</Typography>
              <Typography variant="body1">From: {email.from}</Typography>
              <Typography variant="body2" sx={{ color: "green" }}>
                Routed To: {email.routed_to}
              </Typography>
            </Paper>
          ))
        ) : (
          <Typography>No emails found.</Typography>
        )}
      </Container>
    </div>
  );
};

export default App;