function doLinesIntersect(x1, y1, x2, y2, x3, y3, x4, y4) {
    // Calculate slopes of the lines
    const m1 = (y2 - y1) / (x2 - x1);
    const m2 = (y4 - y3) / (x4 - x3);

    let intersect = false

    // Check if the lines are parallel (slope equality)
    if (m1 !== m2) {
        // Calculate y-intercepts
        const c1 = y1 - m1 * x1;
        const c2 = y3 - m2 * x3;
  
        // Calculate intersection point x-coordinate
        const intersectX = (c2 - c1) / (m1 - m2);
  
        // Calculate intersection point y-coordinate
        const intersectY = m1 * intersectX + c1;
  
        // Check if the intersection point is within the line segments
        if (
            intersectX >= Math.min(x1, x2) &&
            intersectX <= Math.max(x1, x2) &&
            intersectY >= Math.min(y1, y2) &&
            intersectY <= Math.max(y1, y2) &&
            intersectX >= Math.min(x3, x4) &&
            intersectX <= Math.max(x3, x4) &&
            intersectY >= Math.min(y3, y4) &&
            intersectY <= Math.max(y3, y4)
        ) {
            // return [intersectX, intersectY];
            intersect = true
        }
    }
  
    // Return null if lines don't intersect or are coincident
    return intersect;
  }

function pokingShield(player, otherPlayer) {
    return doLinesIntersect(
        player.x, 
        player.y,
        player.x + player.pokerLength * cos(player.angle),
        player.y + player.pokerLength * sin(player.angle),
        otherPlayer.front_x1,
        otherPlayer.front_y1,
        otherPlayer.front_x2,
        otherPlayer.front_y2
    ) 
}

function pokingBody(player, otherPlayer) {
    if (dist(player.pokerTipX, player.pokerTipY, otherPlayer.x, otherPlayer.y) < otherPlayer.bodySize / 2) {
        return true
    } else {
        return false
    }
}

