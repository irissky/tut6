import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet,Button } from 'react-native'

import { graphql,Mutation } from 'react-apollo';
import gql from 'graphql-tag'

const issueQuery = gql`
  query {
    issueList {
      id name phone time
    }
  }
`;

const addIssue = gql`
  mutation addIssue($issue: IssueInputs!) {
    issueAdd( issue: $issue  ) {
      id
    }
  }
`;



export default class RNApp extends Component {
  state = {
    name: '',
    phone: ''
  };

  render() {
    return (
      
        <View style={styles.container}>
          <Mutation mutation={addIssue} refetchQueries={[{ query: issueQuery }]}>
            {(addIssueMutation, { data }) => (
              <View>
                <Text style={styles.welcome}>Customer data:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={text => this.setState({ name: text })}
                  value={this.state.name}
                  placeholder="name"
                />
                <TextInput
                  style={styles.input}
                  onChangeText={text => this.setState({ phone: text })}
                  value={this.state.phone}
                  placeholder="phone"
                />
                <View  style={styles.fixToText}>
                <Button
                  onPress={() => {
                    const issue = { name: this.state.name, phone: this.state.phone}
                    addIssueMutation({
                      variables: {
                        issue
                      }
                    })
                      .then(res => res)
                      .catch(err => <Text>{err}</Text>);
                    this.setState({ phone: '', name: '' });
                  }}
                  title="Add"
                />
                </View>
              </View>
            )}
          </Mutation>
          
       
        </View>
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  input: {
    backgroundColor: '#dddddd',
    height: 50,
    margin: 20,
    marginBottom: 0,
    paddingLeft: 10
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
    alignSelf:'flex-end'
  },
});