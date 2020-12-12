import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { blue, pink } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
const PinkCheckBox = withStyles({
  root: {
    color: blue[400],
    '&$checked': {
      color: blue[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function TinderCheckbox({children}) {
  const [state, setState] = React.useState({
    checkedA: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={<PinkCheckBox checked={state.checkedG} onChange={handleChange} name="checkedA" />}
        label={children}
      />
    </FormGroup>
  );
}
