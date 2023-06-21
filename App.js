import React, { useEffect, useState } from 'react';
import { View, Image, TextInput, Button, StyleSheet, ScrollView, Text, TouchableOpacity, Modal} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const CommonButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);
const handleLogoutPress = () =>{
  navigation.navigate('Login')
}
//____________________________________Home________________________________________________________
const HomeScreen = ({ navigation }) => {
  const handleLogoButtonPress = () => {
    navigation.navigate('Home');
  };

  const handleStaffContactsButtonPress = () => {
    navigation.navigate('StaffContacts');
  };

  return (
    <View style={styles.container}>
      <CommonButton title="Home" onPress={handleLogoButtonPress} />
      <CommonButton title="Staff Contacts" onPress={handleStaffContactsButtonPress} />
      <CommonButton title="Log Out" onPress={handleLogoutPress} />
    </View>
  );
};
//____________________________________Login________________________________________________________
const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <CommonButton title="Login" onPress={handleLogin} />
    </View>
  );
};
//_____________________________________Staff___________________________________________________________
const StaffContactsScreen = ({ navigation }) => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://10.0.0.22:44350/helloworldWebService1.asmx/GetEmployees');
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error(error);
      }
    };

    const handleEmployeePress = (employee) => {
      setSelectedEmployee(employee);
      setModalVisible(true);
    };
  
    const handleCloseModal = () => {
      setModalVisible(false);
    };
  
    useEffect(() => {
      fetchEmployees();
    }, []);
  
  const handleLogoPress = () => {
    navigation.navigate('Home');
  };

  const handleAddStaffPress = () => {
      navigation.navigate('AddStaff')
    };

  const handleLogoutPress = () =>{
    navigation.navigate('Login')
  }
  const handleDeleteStaff = () =>{
    navigation.navigate('DeleteStaff')
  }
  const handleEditEmployeeScreen = (person) =>{
    navigation.navigate('EditStaff', person)
    setModalVisible(false);
  }
  return (
    <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.contactsContainer}>
        {employees.map((employee) => (
          <TouchableOpacity
            key={employee.id}
            style={styles.contactItem}
            onPress={() => handleEmployeePress(employee)}
          >
            <Text style={styles.contactName}>{employee.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>

          <Text style={styles.modalTitle}>{selectedEmployee?.name}</Text>
          <Text>ID: {selectedEmployee?.id}</Text>
          <Text>Number: {selectedEmployee?.number} </Text>
          <Text>Category: {selectedEmployee?.category.Id}; {selectedEmployee?.category.Name}</Text>
          <Text style={styles.boldText}>Address: </Text>
          <Text>Street: {selectedEmployee?.Address.street}</Text>
          <Text>City: {selectedEmployee?.Address.city}</Text>
          <Text>State: {selectedEmployee?.Address.state}</Text>
          <Text>Country: {selectedEmployee?.Address.country}</Text>
          <Text>ZIP: {selectedEmployee?.Address.ZIP}</Text>


          <CommonButton styles button title="Close" onPress={handleCloseModal} />
          <CommonButton styles button title="Edit" onPress={()=>{handleEditEmployeeScreen(selectedEmployee)}}/>
        </View>
      </Modal>
      <View style={styles.buttonsContainer}>
        <CommonButton title="Home" onPress={handleLogoPress} />
        <CommonButton title="Add Staff" onPress={handleAddStaffPress} />
        <CommonButton title="Log Out" onPress={handleLogoutPress} />
        <CommonButton title="Delete Staff" onPress = {handleDeleteStaff} />
      </View>
    </View>
  );
};
//_____________________________________Add Employee______________________________________________________

const AddEmployee =() =>{
  const [formValues, setFormValues] = useState({
    name: '',
    number: '',
    category: '',
    street: '',
    city: '',
    state: '',
    ZIP: '',
    country:'',
  });
  const handleFormSubmit = async () => {
    // Perform form validation and any additional processing before submitting the form
    // Save the new employee to the backend using an appropriate API or method
    try {
      let a = `name=${formValues.name}&number=${formValues.number}&category=${formValues.category}&street=${formValues.street}&city=${formValues.city}&state=${formValues.state}&ZIP=${formValues.ZIP}&country=${formValues.country}`
      const response = await fetch('http://10.0.0.22:44350/helloworldWebService1.asmx/AddStaff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: a, 
      });

      if (response.ok) {
        console.log('Employee saved successfully!');
      }
      else{
        console.log('Employee was not saved')
      }
    } 
    catch (error) {
      console.error(error);
    }
  };
  
  const back = () =>{
    navigation.navigate('StaffContacts')
  }
    
  return (
    <View style={styles.container}>
      <Text>Add Employee</Text>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input1}
            placeholder="Name"
            value={formValues.name}
            onChangeText={(text) => setFormValues({ ...formValues, name: text })}
          />
          <TextInput
            style={styles.input1}
            placeholder="Number"
            value={formValues.number}
            onChangeText={(text) => setFormValues({ ...formValues, number: text })}
          />
          <TextInput
            style={styles.input1}
            placeholder="Category"
            value={formValues.category}
            onChangeText={(text) => setFormValues({ ...formValues, category: text })}
          />
          <TextInput
            style={styles.input1}
            placeholder="Street"
            value={formValues.street}
            onChangeText={(text) => setFormValues({ ...formValues, street: text })}
          />
          <TextInput
            style={styles.input1}
            placeholder="City"
            value={formValues.city}
            onChangeText={(text) => setFormValues({ ...formValues, city: text })}
          />
          <TextInput
            style={styles.input1}
            placeholder="State"
            value={formValues.state}
            onChangeText={(text) => setFormValues({ ...formValues, state: text })}
          />
          <TextInput
            style={styles.input1}
            placeholder="ZIP"
            value={formValues.ZIP}
            onChangeText={(text) => setFormValues({ ...formValues, ZIP: text })}
          />
          <TextInput
            style={styles.input1}
            placeholder="Country"
            value={formValues.country}
            onChangeText={(text) => setFormValues({ ...formValues, country: text })}
          />
            <CommonButton title="Submit" onPress={handleFormSubmit}/>
            <CommonButton title="Go back" onPress={back} />
        </View>
    </View>
  );
  };
//_______________________________________Delete_________________________________________________________
const DeleteStaff = () => {
  const [formValues, setFormValues] = useState({ text: '' });
  const [message, setMessage] = useState('');

  const handleDelete = async () => {
    const p = `id=${formValues.text}`;
    try {
      const response = await fetch('http://10.0.0.22:44350/helloworldWebService1.asmx/DeletePeople', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: p,
      });
      if (response.ok) {
        setMessage('Deleted successfully');
      } else {
        setMessage('Deletion failed');
      }
    } catch (error) {
      console.error(error);
      setMessage('Error occurred during deletion');
    }
  };

  const GoBack = () =>{
    navigation.navigate('StaffContacts')
  }

  return (
    <View>
      <Text>Employee ID</Text>
      <TextInput onChangeText={text => setFormValues({ text })} />
      <CommonButton title="Submit" onPress={handleDelete} />
      <CommonButton title="Go back" onPress={GoBack} />
      <Text>{message}</Text>
    </View>
  );
};

//_______________________________________Edit employee_______________________________________________
function EditEmployeeScreen({route}){
  const person = route.params
  const [formValues, setFormValues] = useState({
    name: '',
    number: '',
    category: '',
    street: '',
    city: '',
    state: '',
    ZIP: '',
    country: '',
  });

  const handleSave = async () => {
      try {
        if (areFormValuesChanged()) {
          let c = `id=${person.id}&name=${formValues.name}&number=${formValues.number}&category=${formValues.category}&street=${formValues.street}&city=${formValues.city}&state=${formValues.state}&ZIP=${formValues.ZIP}&country=${formValues.country}`
     
          const response = await fetch('http://10.0.0.22:44350/helloworldWebService1.asmx/UpdateEmployee', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: c,
          });
          if (response.ok) {
            console.log('Employee data updated successfully');
          } else {
            console.error('Failed to update employee data');
          }
        } else {
          console.log('No changes detected. Skipping update.');
        }
      } catch (error) {
        console.error('Error updating employee data:', error);
      }
    };
    
    const areFormValuesChanged = () => {
      return (
        formValues.name !== person.name ||
        formValues.number !== person.number ||
        formValues.category !== person.category ||
        formValues.street !== person.address.street ||
        formValues.city !== person.address.city ||
        formValues.state !== person.address.state ||
        formValues.ZIP !== person.address.ZIP ||
        formValues.country !== person.address.country
      );
    };
  return (
    <View>
      {person ? (
        <>
          <Text>Employee ID: {person.id}</Text>
          <Text>Name:</Text>
          <TextInput
            value={formValues.name}
            onChangeText={(text) => setFormValues({ ...formValues, name: text })}
          />
          <Text>Number:</Text>
          <TextInput
            value={formValues.number}
            onChangeText={(text) => setFormValues({ ...formValues, number: text })}
          />
          <Text>Category:</Text>
          <TextInput
            value={formValues.category}
            onChangeText={(text) => setFormValues({ ...formValues, category: text })}
          />
          <Text>Street:</Text>
          <TextInput
            value={formValues.street}
            onChangeText={(text) => setFormValues({ ...formValues, street: text })}
          />
          <Text>City:</Text>
          <TextInput
            value={formValues.city}
            onChangeText={(text) => setFormValues({ ...formValues, city: text })}
          />
          <Text>State:</Text>
          <TextInput
            value={formValues.state}
            onChangeText={(text) => setFormValues({ ...formValues, state: text })}
          />
          <Text>ZIP:</Text>
          <TextInput
            value={formValues.ZIP}
            onChangeText={(text) => setFormValues({ ...formValues, ZIP: text })}
          />
          <Text>Country:</Text>
          <TextInput
            value={formValues.country}
            onChangeText={(text) => setFormValues({ ...formValues, country: text })}
          />
          <CommonButton title="Save" onPress={handleSave} />
        </>
      ) : (
        <Text>Loading employee data...</Text>
      )}
    </View>
  );
};

//_______________________________________App_________________________________________________________
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="StaffContacts" component={StaffContactsScreen} />
        <Stack.Screen name="AddStaff" component={AddEmployee}/>
        <Stack.Screen name= "DeleteStaff" component={DeleteStaff}/>
        <Stack.Screen name= "EditStaff" component={EditEmployeeScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
//_______________________________________css_________________________________________________________
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
  contactsContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  contactItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  boldText: {
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    fontSize: 16
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 18,
  },
  contactName: {
    fontSize: 18,
    marginBottom: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#cb6d4f',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
  },
  formContainer: {
    width: '80%',
  },
  input1: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  }
}
);

export default App;