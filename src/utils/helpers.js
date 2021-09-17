export function formatDate (timestamp) {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-US')
    return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
  }
  
export function formatQuestion (question, authedUser) {
    const { id, timestamp, author, avatarURL } = question
    const optionOneText = question.optionOne.text
    const optionOneVotes = question.optionOne.votes
    const optionTwoText = question.optionTwo.text
    const optionTwoVotes = question.optionTwo.votes
  
    return {
      name: author,
      id,
      timestamp,
      optionOneText,
      optionTwoText,
      avatar: avatarURL,
      optionOne: optionOneVotes.length,
      optionTwo: optionTwoVotes.length,
      hasAnswered: question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)
    }
}