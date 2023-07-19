import { createGroup, getHomepageGroups, getGroupById } from '~/lib/groups';
import _ from 'lodash';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let body = JSON.parse(req.body);
    let result = await createGroup(body);
    res.status(result.status).json(result);
  } else if (req.method === 'GET') {
    let logs = [];
    let homepageGroup = await getHomepageGroups('homePage');
    if (homepageGroup.status !== 200) {
      res.status(homepageGroup.status).json(homepageGroup);
    }
    if (homepageGroup && homepageGroup.status == 200 && homepageGroup.data && homepageGroup.data.pageContent.length > 0) {
      logs.push(homepageGroup.log);
      let currentGroup = await getGroupById('homePage');
      let homepageContent = [];
      homepageContent.push({
        group: currentGroup
      });
      let home = _.sortBy(homepageContent, function (e) {
        return e.group.data.groupId.groupCode;
      });
      res.status(200).json({ home, logs });
    } else {
      res.status(homepageGroup.status).json(homepageGroup);
    }
  }
}
