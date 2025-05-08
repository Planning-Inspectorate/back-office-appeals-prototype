const { getLinkedAppeals } = require('../helpers/linked-appeals')
const _ = require('lodash')
const { DateTime } = require("luxon")

module.exports = router => {

  router.get('/main/appeals/:appealId/decision', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    let rows = []
    if(appeal.isLeadAppeal) {

      if(appeal.decision) {

        var rowValueHtml = appeal.decision.decision
        if(appeal.decision.decision == 'Invalid') {
          rowValueHtml = rowValueHtml + `<p class="govuk-!-margin-top-2 govuk-!-margin-bottom-0">Reason: ${appeal.decision.invalidReason}</p>`
        }

        rows.push({
          key: {
            text: `Decision for lead appeal ${appeal.id}`
          },
          value: {
            html: rowValueHtml
          }
        })
  
        _.forEach(getLinkedAppeals(appeal.id, req.session.data.linkedAppeals), (linkedAppeal) => {
          
          var decision = req.session.data.appeals.find(appeal => appeal.id == linkedAppeal.id).decision

          var rowValueHtml = decision.decision
          if(decision.decision == 'Invalid') {
            rowValueHtml = rowValueHtml + `<p class="govuk-!-margin-top-2 govuk-!-margin-bottom-0">Reason: ${decision.invalidReason}</p>`
          }


          rows.push({
            key: {
              text: `Decision for child appeal ${linkedAppeal.id}`
            },
            value: {
              html: rowValueHtml 
            }
          })
        })

        rows.push({
          key: {
            text: "Decision letter"
          },
          value: {
            html: '<a href="#">decision-letter.pdf</a>'
          },
          actions: {
            items: [
              {
                href: `/main/appeals/${appeal.id}/decision/edit-decision-letter`,
                text: "Change",
                visuallyHiddenText: "Decision letter"
              }
            ]
          }
        })

        rows.push({
          key: {
            text: "Decision issued date"
          },
          value: {
            text: DateTime.fromISO(appeal.decision.issueDate).toFormat('d LLLL yyyy')
          }
        })
      }

      if (appeal.appellantCostsDecision) {
        rows.push({
          key: {
            text: "Appellant costs decision letter"
          },
          value: {
            html: `<a href="#">${appeal.appellantCostsDecision.letter.name}</a>`
          }
        })
  
        rows.push({
          key: {
            text: "Appellant costs decision issue date"
          },
          value: {
            text: DateTime.fromISO(appeal.appellantCostsDecision.issueDate).toFormat('d LLLL yyyy')
          }
        })
      }

      if (appeal.lpaCostsDecision) {
        rows.push({
          key: {
            text: "LPA costs decision letter"
          },
          value: {
            html: `<a href="#">${appeal.lpaCostsDecision.letter.name}</a>`
          }
        })

        rows.push({
          key: {
            text: "LPA costs decision issue date"
          },
          value: {
            text: DateTime.fromISO(appeal.lpaCostsDecision.issueDate).toFormat('d LLLL yyyy')
          }
        })
      }


    }


    res.render('/main/appeals/decision/show', {
      appeal,
      rows
    })
  })

}