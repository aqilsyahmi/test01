import React, { useEffect } from "react"
import axios from "axios"
// PaymentCard.js

import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import { CardMedia, Grid, Stack } from "@mui/material"
import orders from '../../Images/png-clipart-computer-icons-icon-design-order-icon-cdr-angle.png'
const UserDashboard = () => {
  useEffect(() => {
    const fetchAllPayment = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/cart/charges",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        console.log(response.data, "response") // accessing response data
      } catch (error) {
        console.error("Error fetching payment transactions:", error)
      }
    }
    fetchAllPayment()
  }, [])
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={12}>
          <Card
            sx={{
              height: "100px",

              margin: "20px",
              backgroundColor: "#f9f9f9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CardContent>
              <Stack direction="row">
                <img src={orders} alt="" style={{width:"40px",height:"30px",objectFit:"contain"}} />
                <Typography gutterBottom variant="h5" component="div">
                  My Orders
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {[...Array(4)].map((_, index) => (
          <Grid item xs={12} sm={6} md={12} key={index}>
            <Card
              sx={{
                margin: "20px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Payment ID:
                </Typography>
                <Typography variant="body1">Amount:</Typography>
                <Typography variant="body1">Status: </Typography>
                <Typography variant="body1" color="text.secondary">
                  Date: 34/5/2000
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Name:
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Email:
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Address: <address></address>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default UserDashboard