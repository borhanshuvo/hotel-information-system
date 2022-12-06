import {
  Document,
  Font,
  Page,
  PDFDownloadLink,
  Text,
  View,
} from "@react-pdf/renderer";

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://virtual-expert.vercel.app/fonts/Roboto-Light.ttf",
      fontWeight: 300,
      color: "black", // Also accepts numeric values, ex. 700
    },
    {
      src: "https://virtual-expert.vercel.app/fonts/Roboto-Regular.ttf",
      fontWeight: 400, // Also accepts numeric values, ex. 700
    },
    {
      src: "https://virtual-expert.vercel.app/fonts/Roboto-Bold.ttf",
      fontWeight: "700, 900", // Also accepts numeric values, ex. 700
    },
  ],
});

const MyDoc = ({ info }) => (
  <Document>
    <Page
      size="a4"
      style={{ padding: "35px 35px 0px 35px", fontFamily: "Roboto" }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "95vh",
        }}
      >
        <View>
          {/* Header */}
          <View>
            <Text
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "4px",
                color: "#FFAC45",
                textAlign: "center",
              }}
            >
              Hotel Information System
            </Text>
          </View>

          {/* Date & Invoice Number */}
          <View style={{ marginTop: "30px" }}>
            <Text style={{ fontSize: "12px" }}>
              <Text
                style={{
                  fontWeight: 700,
                  fontSize: "11px",
                  letterSpacing: "1px",
                  color: "#FFAC45",
                }}
              >
                DATE:
              </Text>{" "}
              <Text style={{ fontWeight: 300, fontSize: "11px" }}>
                {(info?.createdAt).split("T")[0]}
              </Text>
            </Text>
            <Text
              style={{
                fontSize: "12px",
                marginBottom: "5px",
                marginTop: "5px",
              }}
            >
              <Text
                style={{
                  fontWeight: 700,
                  fontSize: "11px",
                  letterSpacing: "1px",
                  color: "#FFAC45",
                }}
              >
                INVOICE NO:
              </Text>{" "}
              <Text style={{ fontWeight: 300, fontSize: "11px" }}>
                {info?._id}
              </Text>
            </Text>
          </View>

          <View style={{ marginBottom: "40px" }}>
            <Text style={{ fontSize: "12px" }}>
              <Text
                style={{
                  fontWeight: 700,
                  fontSize: "11px",
                  letterSpacing: "1px",
                  color: "#FFAC45",
                }}
              >
                HOTEL NAME:
              </Text>{" "}
              <Text style={{ fontWeight: 300, fontSize: "11px" }}>
                {info?.hotels?.user?.name}
              </Text>
            </Text>
            <Text
              style={{
                fontSize: "12px",
                marginTop: "5px",
                marginBottom: "5px",
              }}
            >
              <Text
                style={{
                  fontWeight: 700,
                  fontSize: "11px",
                  letterSpacing: "1px",
                  color: "#FFAC45",
                }}
              >
                HOTEL EMAIL:
              </Text>{" "}
              <Text style={{ fontWeight: 300, fontSize: "11px" }}>
                {info?.hotels?.email}
              </Text>
            </Text>
            <Text style={{ fontSize: "12px" }}>
              <Text
                style={{
                  fontWeight: 700,
                  fontSize: "11px",
                  letterSpacing: "1px",
                  color: "#FFAC45",
                }}
              >
                HOTEL PHONE NO:
              </Text>{" "}
              <Text style={{ fontWeight: 300, fontSize: "11px" }}>
                {info?.hotels?.user?.phoneNumber}
              </Text>
            </Text>
          </View>

          {/* Table*/}
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "#FFAC45",
                marginTop: "20px",
                padding: "10px",
              }}
            >
              <View style={{ flexDirection: "column", width: "40%" }}>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: "11px",
                    letterSpacing: "1px",
                    textAlign: "center",
                  }}
                >
                  Room Name
                </Text>
              </View>
              <View style={{ flexDirection: "column", width: "20%" }}>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: "11px",
                    letterSpacing: "1px",
                    textAlign: "center",
                  }}
                >
                  From
                </Text>
              </View>
              <View style={{ flexDirection: "column", width: "20%" }}>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: "11px",
                    letterSpacing: "1px",
                    textAlign: "center",
                  }}
                >
                  To
                </Text>
              </View>
              <View style={{ flexDirection: "column", width: "10%" }}>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: "11px",
                    letterSpacing: "1px",
                    textAlign: "center",
                  }}
                >
                  Adult
                </Text>
              </View>
              <View style={{ flexDirection: "column", width: "10%" }}>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: "11px",
                    letterSpacing: "1px",
                    textAlign: "center",
                  }}
                >
                  Child
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: "10px",
                padding: "10px",
                borderBottom: "2px solid #F7F6F2",
              }}
            >
              <View style={{ flexDirection: "column", width: "40%" }}>
                <Text
                  style={{
                    fontSize: "11px",
                    letterSpacing: "1px",
                    textAlign: "center",
                  }}
                >
                  {info?.rooms?.name}
                </Text>
              </View>
              <View style={{ flexDirection: "column", width: "20%" }}>
                <Text
                  style={{
                    fontSize: "11px",
                    letterSpacing: "1px",
                    textAlign: "center",
                  }}
                >
                  {(info?.from).split("T")[0]}
                </Text>
              </View>
              <View style={{ flexDirection: "column", width: "20%" }}>
                <Text
                  style={{
                    fontSize: "11px",
                    letterSpacing: "1px",
                    textAlign: "center",
                  }}
                >
                  {(info?.to).split("T")[0]}
                </Text>
              </View>
              <View style={{ flexDirection: "column", width: "10%" }}>
                <Text
                  style={{
                    fontSize: "11px",
                    letterSpacing: "1px",
                    textAlign: "center",
                  }}
                >
                  {info?.adult}
                </Text>
              </View>
              <View style={{ flexDirection: "column", width: "10%" }}>
                <Text
                  style={{
                    fontSize: "11px",
                    letterSpacing: "1px",
                    textAlign: "center",
                  }}
                >
                  {info?.child}
                </Text>
              </View>
            </View>
          </View>

          {/* Total Calculation*/}
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: "20px",
              }}
            >
              <View style={{ flexDirection: "column", width: "30%" }}>
                {/* Room Price  */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ width: "60%" }}>
                    <Text
                      style={{
                        fontSize: "11px",
                        margin: "3px 0px",
                        letterSpacing: "1px",
                        fontWeight: 300,
                        textAlign: "right",
                      }}
                    >
                      Price
                    </Text>
                  </View>
                  <View style={{ width: "40%" }}>
                    <Text
                      style={{
                        fontSize: "11px",
                        margin: "3px 0px 3px 15px",
                        letterSpacing: "1px",
                        fontWeight: 300,
                        textAlign: "right",
                      }}
                    >
                      ${info?.roomPrice}
                    </Text>
                  </View>
                </View>
                {/* Bed Price  */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ width: "60%" }}>
                    <Text
                      style={{
                        fontSize: "11px",
                        margin: "3px 0px",
                        letterSpacing: "1px",
                        fontWeight: 300,
                        textAlign: "right",
                      }}
                    >
                      Bed Price ({info?.numberOfBed})
                    </Text>
                  </View>
                  <View style={{ width: "40%" }}>
                    <Text
                      style={{
                        fontSize: "11px",
                        margin: "3px 0px 3px 15px",
                        letterSpacing: "1px",
                        fontWeight: 300,
                        textAlign: "right",
                      }}
                    >
                      ${info?.bedPrice}
                    </Text>
                  </View>
                </View>
                {/* Discount */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ width: "60%" }}>
                    <Text
                      style={{
                        fontSize: "11px",
                        margin: "3px 0px",
                        letterSpacing: "1px",
                        fontWeight: 300,
                        textAlign: "right",
                      }}
                    >
                      Discount (%)
                    </Text>
                  </View>
                  <View style={{ width: "40%" }}>
                    <Text
                      style={{
                        fontSize: "11px",
                        margin: "3px 0px 3px 15px",
                        letterSpacing: "1px",
                        fontWeight: 300,
                        textAlign: "right",
                      }}
                    >
                      {info?.discount}
                    </Text>
                  </View>
                </View>
                {/* Total Days */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ width: "60%" }}>
                    <Text
                      style={{
                        fontSize: "11px",
                        margin: "3px 0px",
                        letterSpacing: "1px",
                        fontWeight: 300,
                        textAlign: "right",
                      }}
                    >
                      Total Days
                    </Text>
                  </View>
                  <View style={{ width: "40%" }}>
                    <Text
                      style={{
                        fontSize: "11px",
                        margin: "3px 0px 3px 15px",
                        letterSpacing: "1px",
                        fontWeight: 300,
                        textAlign: "right",
                      }}
                    >
                      {info?.totalDays}
                    </Text>
                  </View>
                </View>
                {/* Total */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ width: "60%" }}>
                    <Text
                      style={{
                        fontSize: "11px",
                        margin: "3px 0px",
                        letterSpacing: "1px",
                        fontWeight: 700,
                        textAlign: "right",
                      }}
                    >
                      Total
                    </Text>
                  </View>
                  <View style={{ width: "40%" }}>
                    <Text
                      style={{
                        fontSize: "11px",
                        margin: "3px 0px 3px 15px",
                        letterSpacing: "1px",
                        fontWeight: 700,
                        textAlign: "right",
                      }}
                    >
                      ${info?.price}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            {/*  */}
          </View>

          {/* Room Info */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              margin: "30px 0px",
            }}
          >
            <View style={{ width: "100%", marginTop: "20px" }}>
              <View style={{ fontSize: "12px", fontWeight: 300 }}>
                <Text
                  style={{
                    fontSize: "12px",
                    marginBottom: "10px",
                    letterSpacing: "1px",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "700",
                      color: "#FFAC45",
                      textTransform: "uppercase",
                    }}
                  >
                    Room Facilities:
                  </Text>{" "}
                  <Text style={{ fontSize: "11px" }}>
                    {info?.rooms?.roomAmenities}
                  </Text>
                </Text>
              </View>
              <View style={{ fontSize: "12px", fontWeight: 300 }}>
                <Text
                  style={{
                    fontSize: "12px",
                    paddingBottom: "5px",
                    paddingTop: "5px",
                    letterSpacing: "1px",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "700",
                      color: "#FFAC45",
                      textTransform: "uppercase",
                    }}
                  >
                    Address:
                  </Text>{" "}
                  <Text style={{ fontSize: "11px" }}>
                    {info?.hotels?.address}
                  </Text>
                </Text>
              </View>
              <View
                style={{
                  fontSize: "12px",
                  letterSpacing: "1px",
                  fontWeight: 300,
                }}
              >
                <Text style={{ fontSize: "12px", marginBottom: "5px" }}>
                  <Text
                    style={{
                      fontWeight: "700",
                      color: "#FFAC45",
                      textTransform: "uppercase",
                    }}
                  >
                    Check In:
                  </Text>{" "}
                  <Text style={{ fontSize: "11px" }}>
                    {info?.hotels?.checkIn}
                  </Text>
                </Text>
              </View>
              <View
                style={{
                  fontSize: "12px",
                  letterSpacing: "1px",
                  fontWeight: 300,
                }}
              >
                <Text style={{ fontSize: "12px", marginBottom: "5px" }}>
                  <Text
                    style={{
                      fontWeight: "700",
                      color: "#FFAC45",
                      textTransform: "uppercase",
                    }}
                  >
                    Check Out:
                  </Text>{" "}
                  <Text style={{ fontSize: "11px" }}>
                    {info?.hotels?.checkOut}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* footer part */}
        <View>
          <View
            style={{
              marginBottom: "35px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <View style={{ textAlign: "center" }}>
              <Text style={{}}>
                <Text style={{ fontWeight: 300, fontSize: "11px" }}>
                  {info?.customerName}
                </Text>
              </Text>
              <Text style={{ marginBottom: "5px", marginTop: "5px" }}>
                <Text style={{ fontWeight: 300, fontSize: "11px" }}>
                  {info?.customerPhoneNumber}
                </Text>
              </Text>
              <Text style={{}}>
                <Text
                  style={{
                    fontWeight: 300,
                    fontSize: "11px",
                    color: "#FFAC45",
                    fontWeight: "700",
                  }}
                >
                  {info?.paymentSuccess
                    ? "Payment Verified"
                    : "Payment Not Verified"}
                </Text>
              </Text>
            </View>
          </View>
          <View style={{ borderTop: "2px solid #FFAC45" }}>
            <Text
              style={{
                padding: "10px 20px",
                fontSize: "12px",
                letterSpacing: "1px",
                fontWeight: 300,
                textAlign: "center",
              }}
            >
              H-2677, KA-63/1, R-Khapara, Khilkhet, Dhaka
            </Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

const MyDocument = ({ info }) => (
  <div className="">
    <PDFDownloadLink
      document={<MyDoc info={info} />}
      fileName={`${info?.customerName}.pdf`}
    >
      {({ blob, url, loading, error }) =>
        loading ? "Loading document..." : "Download"
      }
    </PDFDownloadLink>
  </div>
);

export default MyDocument;
