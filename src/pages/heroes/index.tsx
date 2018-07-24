import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { ApplicationState, ConnectedReduxProps } from "../../store/root";
import { Hero } from "../../store/heroes/types";
import { fetchRequest } from "../../store/heroes/actions";

import LoadingBar from "../../components/layout/LoadingBar";
import DataTable from "../../components/layout/DataTable";

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

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps;

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || "";

class HeroesIndexPage extends React.Component<AllProps> {
  public componentDidMount() {
    this.props.fetchRequest();
  }

  public render() {
    const { loading } = this.props;

    return (
      <div>
        <LoadingBar loading={loading} />
        <p className="text-right">
          <small>*in last 30 days</small>
        </p>
        {this.renderData()}
      </div>
    );
  }

  private renderData() {
    const { loading, data } = this.props;

    return (
      <DataTable columns={["Hero", "Pro Picks/Bans*", "Pro Wins*"]} widths={["auto", "", ""]}>
        {loading &&
          data.length === 0 && (
            <tr>
              <td colSpan={3}>Loading...</td>
            </tr>
          )}
        {!loading && data.map(hero => (
          <tr key={hero.id}>
            <td>
              <img className="gutter-right" src={API_ENDPOINT + hero.icon} alt={hero.name} />
              <span>
                <Link to={`/heroes/${hero.name}`}>{hero.localized_name}</Link>
              </span>
            </td>
            <td>
              {hero.pro_pick || 0} / {hero.pro_ban || 0}
            </td>
            <td>{hero.pro_win || 0}</td>
          </tr>
        ))}
      </DataTable>
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
)(HeroesIndexPage);
