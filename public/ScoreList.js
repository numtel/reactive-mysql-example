var ScoreList = React.createClass({
  getInitialState: function() {
    return { active: null };
  },
  render: function() {
    var results = this.props.results;
    var items = [];
    for(var i = 0; i < results.length; i++){
      items.push(<ScoreItem key={results[i].id} item={results[i]} />);
    }
    return <ol className="score-list">{items}</ol>;
  }
});
