import React, { useEffect, useState } from "react";
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
      height: "300px",
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
      fontWeight: "500",
      flex: 1,
      fontWeight: "600",
      fontSize: "14px",
    },
    tableCell: {
      flex: 1,
      fontWeight: "300",
      fontSize: "14px",
    },
    signature: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 60,
    },
    signatureText: {
      fontSize: "14px",
      fontWeight: "400",
    },
    notes: {
      marginTop: 10,
    },

    textColor: {
      color: "#16325b",
      fontSize: "14px",
      lineHeight: "15px",
    },
  });

  const id = localStorage.getItem("billingId");

  //pdf bill view
  const [putData, setPutData] = useState([]);

  const billing = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/customer/viewBill/${id}`
      );

      setPutData(response.data.response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      billing(id);
    }
  }, [id]);

  return (
    <Document>
      {putData.map((item, index) => (
        <Page size="A4" style={styles.page}>
          {/* Header Section */}
          <View style={styles.heading}>
            <View style={styles.logo}>
              <View style={styles.img}></View>
            </View>
            <View style={styles.companyInfo}>
              {/* <Text style={styles.headingtitle}></Text>
           <Text style={styles.headingcontent}>
           ऑफिस पत्ता : इंडियन ऑइल पेट्रोलपम्पसमोर, शिक्षक भवन शेजारी,
           </Text>
           <Text style={styles.headingcontent}>
           तळेगाव - शिक्रापूर रोड, तळेगाव ढमढेरे ता. शिरूर ,जि. पुणे - ४१२२०८.
           </Text>
           <Text style={styles.headingcontent}>
           मोबाईल : 9028071133 / 9850000444
           </Text> */}
            </View>
          </View>

          {/* Booking Title */}
          <View style={styles.booking}>
            <Text>Billing Receipt</Text>
          </View>

          {/* Customer Info Section */}
          <View style={styles.customerInfo}>
            <View style={styles.row}>
              <View style={styles.halfrow}>
                <Text style={styles.label}>Bill no. : </Text>
                <Text style={styles.label1}>{item.billingId}</Text>
              </View>
              <View style={styles.halfrow}>
                <Text style={styles.label}>Date : </Text>
                <Text style={styles.label1}>{item.date}</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.halfrow}>
                <Text style={styles.label}>Name : </Text>
                <Text style={styles.label1}>{item.name}</Text>
              </View>
              <View style={styles.halfrow}>
                <Text style={styles.label}>Address : </Text>
                <Text style={styles.label1}>{item.address}</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.halfrow}>
                <Text style={styles.label}>Mobile : </Text>
                <Text style={styles.label1}>{item.mob_number}</Text>
              </View>
              <View style={styles.halfrow}>
                <Text style={styles.label}>Email : </Text>
                <Text style={styles.label1}>{item.email}</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.halfrow}>
                <Text style={styles.label}>Project Name :</Text>
                <Text style={styles.label1}>{item.projectName}</Text>
              </View>
              <View style={styles.halfrow}>
                <Text style={styles.label}>{item.gatNumber}</Text>
                <Text style={styles.label1}>56</Text>
              </View>
            </View>
          </View>

          {/* Table Section */}
          <View style={styles.infoTable}>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>Plot number</Text>
              <Text style={styles.tableHeader}>Area</Text>
              <Text style={styles.tableHeader}>Rate</Text>
              <Text style={styles.tableHeader}>Total Amount</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.plotNumber}</Text>
              <Text style={styles.tableCell}>{item.plotarea}</Text>
              <Text style={styles.tableCell}>{item.plotrate}</Text>
              <Text style={styles.tableCell}>{item.total_amount}</Text>
            </View>
          </View>

          {/* Details Section */}
          <View style={styles.row}>
            <View style={styles.halfrow}>
              <Text style={styles.label}>Direction : </Text>
              <Text style={styles.label1}>{item.plot_direction}</Text>
            </View>
            <View style={styles.halfrow}>
              <Text style={styles.label}>Total Amount : </Text>
              <Text style={styles.label1}>{item.total_amount}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfrow}>
              <Text style={styles.label}>Payment Type : </Text>
              <Text style={styles.label1}>{item.payment_type}</Text>
            </View>

            <View style={styles.halfrow}>
              <Text style={styles.label}>Payment Type : </Text>
              <Text style={styles.label1}>{item.plotPurchasedType}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfrow}>
              <Text style={styles.label}>Amount in words:</Text>
              <Text style={styles.label1}>{item.amountInWords}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfrow}>
              <Text style={styles.label}>Bank : </Text>
              <Text style={styles.label1}>{item.bankName}</Text>
            </View>
            <View style={styles.halfrow}>
              <Text style={styles.label}>Cheque no. : </Text>
              <Text style={styles.label1}>{item.cheqNum}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfrow}>
              <Text style={styles.label}>Cheque date : </Text>
              <Text style={styles.label1}>{item.cheqDate}</Text>
            </View>
            <View style={styles.halfrow}>
              <Text style={styles.label}>Branch : </Text>
              <Text style={styles.label1}>{item.branchName}</Text>
            </View>
          </View>

          {/* Notes Section */}
          <View style={styles.notes}>
            <Text>Some Imp notes :</Text>
            <Text style={styles.textColor}>
              1. After booking the plot, the plot will not be canceled and the
              amount paid for cancellation / booking will not be refunded.
            </Text>
            <Text style={styles.textColor}>
              2. If payment is not made for 3 consecutive weeks, the plot will
              be canceled and the amount paid will not be refunded.
            </Text>
            <Text style={styles.textColor}>
              3. Plot holder will have to bear all the expenses of the paper for
              naming the plot.
            </Text>
            <Text style={styles.textColor}>
              4. The plot holder will have to bear all the expenses of the paper
              for naming the plot.
            </Text>
            5. After booking the plot, the plot names have to be taken within 15
            days from the date of booking.
          </View>

          {/* Signature Section */}
          <View style={styles.signature}>
            <Text style={styles.signatureText}>Customer Signature</Text>
            <Text style={styles.signatureText}>Representative Signature</Text>
            <Text style={styles.signatureText}>
              Shri Developers and Construction
            </Text>
          </View>
        </Page>
      ))}
    </Document>
  );
}

export default BillViewPDF;
