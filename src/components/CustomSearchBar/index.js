import React from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import styles from './style';
const CustomSearchBar = (props) => {
  const { value, onChange, onClick } = props;
  return (
    <Paper style={styles.container}>
      <div style={styles.content}>
        <Input
          value={value}
          onChange={onChange}
          disableUnderline={true}
          style={styles.input}
          inputProps={{
            placeholder: "Search Car...",
          }}
        />
      </div>
      <IconButton
        onClick={onClick}
        style={styles.iconbutton}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

CustomSearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func,
};
export default CustomSearchBar;