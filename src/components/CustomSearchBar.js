import React from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
function CustomSearchBar(props) {
  const { value, onChange, onClick } = props;
  return (
    <Paper style={{ display: "flex", alignItems: "center" }}>
      <div style={{ flex: 1, alignItems: "center" }}>
        <Input
          value={value}
          onChange={onChange}
          className={"myclass input"}
          disableUnderline={true}
          style={{ width: "100%", paddingLeft: 15 }}
          inputProps={{
            placeholder: "Search Car...",
          }}
        />
      </div>
      <IconButton
        onClick={onClick}
        style={{ width: 50, justifyContent: "center", alignItems: "center" }}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

CustomSearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func,
};
export default CustomSearchBar;
// export default withStyles(styles)(CustomSearchBar);
