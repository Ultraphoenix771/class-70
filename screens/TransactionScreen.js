import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View,TextInput,Image } from 'react-native';
import * as Permissions from 'expo-Permissions'
import {BarCodeScanner}from 'expo-barcode-scanner'
export default class TransactionScreen extends React.Component{
    constructor(){
        super()
        this.state={
            hasCameraPermissions:null,
            buttonState:'normal',
            scannedBookid:'',
            scannedStudentid:'',
            scanned:false
        }
    }
    getCameraPermissions=async(id)=>{
        const {status}=await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPermissions:status==='granted',

            buttonState:id,
scanned:false
        })
    }
    handleBarCodeScanned = async({type, data})=>{
        this.setState({
          scanned: true,
          scannedData: data,
          buttonState: 'normal'
        });
      }
  
      render() {
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;
  
        if (buttonState !== "normal" && hasCameraPermissions){
          return(
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
          );
        }
  
        else if (buttonState === "normal"){
          return(
            <View style={styles.container}>
              <View>
                <Image
                source = {require("../assets/booklogo.jpg")}
                style = {{width:200,height:200}}/>
                <Text style = {{textAlign:"center",fontSize:30}}
                >Wily App</Text>
              </View>
              <View style={styles.inputView}>
                <TextInput style = {styles.inputbox}
                placeholder = "yourbookid"
                value = {this.state.scannedBookid}/>
                <TouchableOpacity style = {styles.scanButton}
                onPress={()=>{
                  this.getCameraPermissions("BookId")
                }}>
                  <Text style={styles.buttonText}>Scan</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.inputView}>
                <TextInput style = {styles.inputbox}
                placeholder = "yourstudentid"
                value={this.state.scannedStudentid}/>
                <TouchableOpacity style = {styles.scanButton}
                onPress={()=>{
                  this.getCameraPermissions("StudentId")
                }}>
                  <Text style={styles.buttonText}>Scan</Text>
                </TouchableOpacity>
              </View>
  
                 
  
            
          </View>
          );
        }
      }
    }
  
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      displayText:{
        fontSize: 15,
        textDecorationLine: 'underline'
      },
      scanButton:{
        backgroundColor: '#2196F3',
        padding: 10,
        margin: 10
      },
      buttonText:{
        fontSize: 20,
      },
      inputView:{
        flexDirection:"row",
        margin:30
      },
      inputbox:{
        width:200,height:40,borderWidth:2,fontSize:20
      }
    });