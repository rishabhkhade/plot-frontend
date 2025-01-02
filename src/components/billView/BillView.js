import React, { useEffect } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import axios from "axios";

function BillViewPDF() {
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: "#fff",
      padding: 20,
    },
    heading: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
    },

    headingcontent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      color: "#16325b",
      fontSize: "16px",
    },
    logo: {
      width: "10%",
      aspectRatio: 1,
      backgroundColor: "rgba(255, 0, 0, 0.185)",
      borderRadius: 5,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    img: {
      height: "100%",
      aspectRatio: 1,
      backgroundColor: "black",
    },
    companyInfo: {
      textAlign: "center",
      width: "90%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
    },
    booking: {
      textAlign: "center",
      marginBottom: 10,
    },
    customerInfo: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      padding: 10,
      marginBottom: 20,
    },
    row: {
      flexDirection: "row",

      marginBottom: 5,
    },

    halfrow: {
      width: "50%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: "20px",
    },
    cell: {
      width: "48%",
    },
    label: {
      fontWeight: "600",
      fontSize: "14px",
      color: "#16325b",
    },
    label1: {
      fontSize: "13px",
      color: "#16325b",
    },
    infoTable: {
      marginBottom: 20,
    },
    tableRow: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
      padding: 5,
    },
    tableHeader: {
      fontWeight: "bold",
      flex: 1,
    },
    tableCell: {
      flex: 1,
    },
    signature: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 60,
    },
    signatureText: {
      fontSize: 14,
      fontWeight: "300",
    },
    notes: {
      marginTop: 10,
    },

    textColor: {
      color: "#16325b",
      fontSize: "18px",
    },
  });

  const id = localStorage.getItem("billingId");

  const billing = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/customer/viewBill/8`
      );

      console.log(response)
    } catch (error) {
        console.log(error)
    }
  };

  useEffect(()=>{
    // if(id){
        billing()
    // }
  },[])

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.heading}>
          <View style={styles.logo}>
            <View style={styles.img}></View>
          </View>
          <View style={styles.companyInfo}>
            <Text style={styles.headingtitle}>Lorem ipsum dolor sit amet.</Text>
            <Text style={styles.headingcontent}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </Text>
            <Text style={styles.headingcontent}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </Text>
            <Text style={styles.headingcontent}>
              phone : Lorem, ipsum dolor sit amet consectetur.
            </Text>
          </View>
        </View>

        {/* Booking Title */}
        <View style={styles.booking}>
          <Text>Booking Receipt</Text>
        </View>

        {/* Customer Info Section */}
        <View style={styles.customerInfo}>
          <View style={styles.row}>
            <View style={styles.halfrow}>
              <Text style={styles.label}>Bill no.: </Text>
              <Text style={styles.label1}>0001</Text>
            </View>
            <View style={styles.halfrow}>
              <Text style={styles.label}>Date: </Text>
              <Text style={styles.label1}>12/12/25</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfrow}>
              <Text style={styles.label}>Name: </Text>
              <Text style={styles.label1}>Raju Bhai</Text>
            </View>
            <View style={styles.halfrow}>
              <Text style={styles.label}>Address: </Text>
              <Text style={styles.label1}>Lohegaon, Pune</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfrow}>
              <Text style={styles.label}>Mobile no.: </Text>
              <Text style={styles.label1}>95896895625</Text>
            </View>
            <View style={styles.halfrow}>
              <Text style={styles.label}>Email: </Text>
              <Text style={styles.label1}>email@gmail.com</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfrow}>
              <Text style={styles.label}>Project Name: </Text>
              <Text style={styles.label1}>Sai Plots</Text>
            </View>
            <View style={styles.halfrow}>
              <Text style={styles.label}>Gat no.: </Text>
              <Text style={styles.label1}>56</Text>
            </View>
          </View>
        </View>

        {/* Table Section */}
        <View style={styles.infoTable}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Plot no.</Text>
            <Text style={styles.tableHeader}>Area</Text>
            <Text style={styles.tableHeader}>Dar</Text>
            <Text style={styles.tableHeader}>Total Amount</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>1</Text>
            <Text style={styles.tableCell}>1</Text>
            <Text style={styles.tableCell}>1</Text>
            <Text style={styles.tableCell}>1</Text>
          </View>
        </View>

        {/* Details Section */}
        <View style={styles.row}>
          <View style={styles.halfrow}>
            <Text style={styles.label}>Direction: </Text>
            <Text style={styles.label1}>North</Text>
          </View>
          <View style={styles.halfrow}>
            <Text style={styles.label}>Booking Amount: </Text>
            <Text style={styles.label1}>56000</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfrow}>
            <Text style={styles.label}>Payment Type: </Text>
            <Text style={styles.label1}>Cash</Text>
          </View>

          <View style={styles.halfrow}>
            <Text style={styles.label}>Type of Payment: </Text>
            <Text style={styles.label1}>EMI</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfrow}>
            <Text style={styles.label}>Amount in words: </Text>
            <Text style={styles.label1}>One Lakhs only</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfrow}>
            <Text style={styles.label}>Bank Name: </Text>
            <Text style={styles.label1}>SBI</Text>
          </View>
          <View style={styles.halfrow}>
            <Text style={styles.label}>Cheque no.: </Text>
            <Text style={styles.label1}>000213</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfrow}>
            <Text style={styles.label}>Date: </Text>
            <Text style={styles.label1}>12/12/25</Text>
          </View>
          <View style={styles.halfrow}>
            <Text style={styles.label}>Branch Name: </Text>
            <Text style={styles.label1}>Pune</Text>
          </View>
        </View>

        {/* Notes Section */}
        <View style={styles.notes}>
          <Text>Some important notes:</Text>
          <Text style={styles.textColor}>
            1. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Text>
          <Text style={styles.textColor}>
            2. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Text>
        </View>

        {/* Signature Section */}
        <View style={styles.signature}>
          <Text style={styles.signatureText}>Customer Signature</Text>
          <Text style={styles.signatureText}>Employee Signature</Text>
          <Text style={styles.signatureText}>Admin Signature</Text>
        </View>
      </Page>
    </Document>
  );
}

export default BillViewPDF;
