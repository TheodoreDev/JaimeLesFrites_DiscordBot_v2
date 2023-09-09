const pb = {
    le: '<:d_v:1139602647444361356>',
    me: '<:m_v:1139602661281374268>',
    re: '<:f_v:1139602673746841721>',
    lf: '<:d_p:1139602584743727246>',
    mf: '<:m_p:1139602603680989204>',
    rf: '<:f_p:1139602629027184811>',
  };
   
  function formatResults(upvotes = [], downvotes = []) {
    const totalVotes = upvotes.length + downvotes.length;
    const progressBarLength = 10;
    const filledSquares = Math.round((upvotes.length / totalVotes) * progressBarLength) || 0;
    const emptySquares = progressBarLength - filledSquares || 0;
   
    if (!filledSquares && !emptySquares) {
      emptySquares = progressBarLength;
    }
   
    const upPercentage = (upvotes.length / totalVotes) * 100 || 0;
    const downPercentage = (downvotes.length / totalVotes) * 100 || 0;
   
    const progressBar =
      (filledSquares ? pb.lf : pb.le) +
      (pb.mf.repeat(filledSquares) + pb.me.repeat(emptySquares)) +
      (filledSquares === progressBarLength ? pb.rf : pb.re);
   
    const results = [];
    results.push(
      `👍 ${upvotes.length} upvotes (${upPercentage.toFixed(1)}%) • 👎 ${
        downvotes.length
      } downvotes (${downPercentage.toFixed(1)}%)`
    );
    results.push(progressBar);

    module.exports = {upvotes, downvotes}
   
    return results.join('\n');
  }
   
  module.exports = formatResults;