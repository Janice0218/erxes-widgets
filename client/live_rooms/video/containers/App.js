import { connect } from 'react-redux';
import { App } from '../components';
import { closeModal } from '../actions';
import { connection } from '../connection';


const mapStateToProps = state => ({
  isShoutboxFormVisible: state.isShoutboxFormVisible,
  loadType: connection.data.formData.loadType,
});


const mapDisptachToProps = dispatch => ({
  onModalClose() {
    dispatch(closeModal);
  },
});

export default connect(mapStateToProps, mapDisptachToProps)(App);
