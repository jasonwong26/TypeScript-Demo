import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { NavItem, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { ApplicationState, ConnectedReduxProps } from "../../store/root";
import { Hero } from "../../store/heroes/types";
import { fetchRequest } from "../../store/heroes/actions";
import LoadingBar from "../../components/layout/LoadingBar";

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  loading: boolean
  data: Hero[]
  errors: string
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
  fetchRequest: typeof fetchRequest
}

interface RouteParams {
  name: string
}

interface State {
  selected?: Hero
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState &
  PropsFromDispatch &
  RouteComponentProps<RouteParams> &
  ConnectedReduxProps;

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || "";

class ShowHeroesPage extends React.Component<AllProps, State> {
  constructor(props: AllProps) {
    super(props);

    this.state = {
      selected: undefined
    };
  }

  public componentDidMount() {
    const { data } = this.props;

    if (!data || data.length === 0) {
      this.props.fetchRequest();
    }
  }

  public render() {
    const { data, loading, match } = this.props;
    const selected = data.find(hero => hero.name === match.params.name);

    return (
      <React.Fragment>
        <div>
          <LinkContainer to="/heroes">
            <Button>Back</Button>
          </LinkContainer>
        </div>
        <div>
          <LoadingBar loading={loading} />
          {!loading && selected && (
            <div className="row">
              <div className="col-sm-6">
                <div>
                  <h3>{selected.localized_name}</h3>
                  <p>
                    {selected.attack_type} - <span>{selected.roles.join(", ")}</span>
                  </p>
                </div>
                <div>
                  <div> {selected.base_str || 0} + {selected.str_gain || 0} </div>
                  <div> {selected.base_agi || 0} + {selected.agi_gain || 0} </div>
                  <div> {selected.base_int || 0} + {selected.int_gain || 0} </div>
                </div>
              </div>
              <div className="col-sm-6">
                <img src={API_ENDPOINT + selected.img} />
              </div>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ heroes }: ApplicationState) => ({
  loading: heroes.loading,
  errors: heroes.errors,
  data: heroes.data
});

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchRequest: () => dispatch(fetchRequest())
});

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowHeroesPage);
