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
            <Text style={styles.headingtitle}>श्री डेव्हलपर्स अँड construction</Text>
            <Text style={styles.headingcontent}>
            ऑफिस पत्ता : इंडियन ऑइल पेट्रोलपम्पसमोर, शिक्षक भवन शेजारी,
            </Text>
            <Text style={styles.headingcontent}>
            तळेगाव - शिक्रापूर रोड, तळेगाव ढमढेरे ता. शिरूर ,जि. पुणे - ४१२२०८.
            </Text>
            <Text style={styles.headingcontent}>
            मोबाईल : 9028071133 / 9850000444
            </Text>
          </View>
        </View>

        {/* Booking Title */}
        <View style={styles.booking}>
          <Text>बुकिंग पावती </Text>
        </View>

        {/* Customer Info Section */}
        <View style={styles.customerInfo}>
          <View style={styles.row}>
            <View style={styles.halfrow}>
              <Text style={styles.label}>पावती क्र. : </Text>
              <Text style={styles.label1}>0001</Text>
            </View>
            <View style={styles.halfrow}>
              <Text style={styles.label}>दिनांक : </Text>
              <Text style={styles.label1}>12/12/25</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfrow}>
              <Text style={styles.label}>नाव : </Text>
              <Text style={styles.label1}>Raju Bhai</Text>
            </View>
            <View style={styles.halfrow}>
              <Text style={styles.label}>पत्ता : </Text>
              <Text style={styles.label1}>Lohegaon, Pune</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfrow}>
              <Text style={styles.label}>मोबाईल : </Text>
              <Text style={styles.label1}>95896895625</Text>
            </View>
            <View style={styles.halfrow}>
              <Text style={styles.label}>ई-मेल : </Text>
              <Text style={styles.label1}>email@gmail.com</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfrow}>
              <Text style={styles.label}>प्रोजेक्टचे नाव : </Text>
              <Text style={styles.label1}>Sai Plots</Text>
            </View>
            <View style={styles.halfrow}>
              <Text style={styles.label}>गट नंबर : </Text>
              <Text style={styles.label1}>56</Text>
            </View>
          </View>
        </View>

        {/* Table Section */}
        <View style={styles.infoTable}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>प्लॉट नंबर </Text>
            <Text style={styles.tableHeader}>चौरस फूट क्षेत्र </Text>
            <Text style={styles.tableHeader}>दर</Text>
            <Text style={styles.tableHeader}>एकूण रक्क्म</Text>
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
            <Text style={styles.label}>चतु:सिरमा: </Text>
            <Text style={styles.label1}>North</Text>
          </View>
          <View style={styles.halfrow}>
            <Text style={styles.label}>एकूण रक्क्म : </Text>
            <Text style={styles.label1}>56000</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfrow}>
            <Text style={styles.label}>Payment Type: </Text>
            <Text style={styles.label1}>Cash</Text>
          </View>

          <View style={styles.halfrow}>
            <Text style={styles.label}>प्लॉट खरेदीवरचे स्वरूप : </Text>
            <Text style={styles.label1}>EMI</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfrow}>
            <Text style={styles.label}>अक्षरी रु. : </Text>
            <Text style={styles.label1}>One Lakhs only</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfrow}>
            <Text style={styles.label}>बँक तपशील : </Text>
            <Text style={styles.label1}>SBI</Text>
          </View>
          <View style={styles.halfrow}>
            <Text style={styles.label}>चेक  नं.: </Text>
            <Text style={styles.label1}>000213</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfrow}>
            <Text style={styles.label}>चेक दिनांक : </Text>
            <Text style={styles.label1}>12/12/25</Text>
          </View>
          <View style={styles.halfrow}>
            <Text style={styles.label}>शाखा : </Text>
            <Text style={styles.label1}>Pune</Text>
          </View>
        </View>

        {/* Notes Section */}
        <View style={styles.notes}>
          <Text>नियम व अटी :</Text>
          <Text style={styles.textColor}>
          १. प्लॉट बुकिंग केल्यानंतर प्लॉट रद्द करण्यात येणार नाही व विसार / बुकिंगसाठी भरलेली रक्कम परत केली जाणार नाही.
          </Text>
          <Text style={styles.textColor}>
          २. सलग ३ हफ्ते न भरल्यास प्लॉट कॅन्सल केला जाईल व भरलेली रक्क्म परत केली जाणार नाही.
          </Text>
          <Text style={styles.textColor}>
          ३.प्लॉट नावे करण्याचे कागतपत्र्याचे सर्व खर्च प्लॉट धारकाला करावा लागेल .
          </Text>
          <Text style={styles.textColor}>
          ३. प्लॉट नावे करण्याचे कागतपत्र्याचे सर्व खर्च प्लॉट धारकाला करावा लागेल .
          </Text>
          ४. प्लॉट बुकिंग केल्यानंतर बुकिंग तारखेपासून १५ दिवसाचा आत प्लॉट नावे घ्यावे लागेल.
        </View>

        {/* Signature Section */}
        <View style={styles.signature}>
          <Text style={styles.signatureText}>ग्राहकाची सही </Text>
          <Text style={styles.signatureText}>प्रतिनिधीची सही</Text>
          <Text style={styles.signatureText}>श्री डेव्हलपर्स अँड construction</Text>
        </View>
      </Page>
    </Document>
  );
}

export default BillViewPDF;
